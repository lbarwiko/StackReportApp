import psycopg2
import os
import json
import sys
import Levenshtein
import re
import datetime 
sys.path.append(sys.path[0]+"/../")
import math
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import time

# import config causing trouble for scrapers/stock_scraper.py
DBCONFIG = {
    'host': 'localhost',
    'dbname': 'predictions',
    'user': 'root',
    'password': 'FinTech123',
    'port': 5432
}

def db_cursor():
    """
    Return the cursor to the database with the specified config
    """
    try:
        conn = psycopg2.connect("dbname='%s' user='%s' password='%s' host='%s' port='%d'" % 
            (DBCONFIG['dbname'], DBCONFIG['user'], DBCONFIG['password'], DBCONFIG['host'], DBCONFIG['port']))
        conn.autocommit = True

    except psycopg2.Error as e:
        print (e.pgerror)
        print ("I am unable to connect to the database.")
    
    return conn.cursor()

def add_stock(symbol, name):
    """
    Add a stock to the database
    (Slow to add a lot of stocks with this function)
    """
    name = name.replace("'", "''")
    cur = db_cursor()
    op_string = "INSERT INTO company(c_symbol, c_name) VALUES ('%s', '%s');" % (symbol, name)
    try:
        cur.execute(op_string)
    except:
        print ("Insert new stocks failed")

def add_single_mf_holding(m_symbol, c_symbol, date, shares):
    """
    Add a mutuful holding to the database
    """
    cur = db_cursor()
    op_string = ("INSERT INTO holdings(c_symbol, m_symbol, h_date, shares) VALUES ('%s', '%s', '%s', '%s');" 
        % (m_symbol, c_symbol, date, shares))
    try:
        cur.execute(op_string)
    except:
        print ("Insert mf holding failed")


def add_mf(m_symbol, m_name, follow_bool):
    """
    Add a mutuful holding to the database
    """
    cur = db_cursor()
    op_string = ("INSERT INTO mutual_fund(m_symbol, m_name, follow) VALUES ('%s', '%s', '%s');" 
        % (m_symbol, m_name, follow_bool))
    try:
        cur.execute(op_string)
    except:
        print ("Insert mf holding failed")


def get_ticker(cname):

    name_dict = json.load(open("predictions_database/stock_name_list.json",'r'))
    name_list = name_dict.keys()

    min = 9999999999
    min_name = ""
    clean_cname = sanitize_company(cname)

    for company in name_list:
        clean_company = sanitize_company(company)
        d = Levenshtein.distance(str(clean_cname), str(clean_company)) 
        if d < min:
            min = d
            min_name = company
    return (name_dict[min_name])

def get_ticker_fuzz(cname):
    name_dict = json.load(open("predictions_database/stock_name_list.json",'r'))
    name_list = name_dict.keys()
    min_name = process.extractOne(cname, name_list)[0]
    return (name_dict[min_name])

def sanitize_company(company_name):
    output = company_name.lower()
    output = re.sub(r'\([^)]*\)', '', output)
    # output = output.replace("(a)", '')
    # output = output.replace("(b)", '')
    output = output.replace(" class ", ' ')
    # output = output.replace("(the)", '')
    output = output.replace("the ", '')
    output = output.replace("incorporated", 'inc')
    output = output.replace("corporation", 'corp')
    output = output.replace("company", 'co')
    output = re.sub(r'[^\w\s]','',output)
    return output


def add_tuple_stock_history(tuple_list):
    cur = db_cursor()
    chain = ','.join(cur.mogrify('(%s,%s,%s)', row).decode('utf-8') for row in tuple_list)

    try:
        cur.execute('INSERT INTO stock_history(c_symbol, price, s_date) values ' + chain
            + " ON CONFLICT (c_symbol, s_date) DO UPDATE SET price = EXCLUDED.price")
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Insert stocks prices failed")


def add_tuple_mf_history(tuple_list):

    cur = db_cursor()
    chain = ','.join(cur.mogrify('(%s,%s,%s)', row).decode('utf-8') for row in tuple_list)

    try:
        cur.execute('INSERT INTO mutual_fund_history(m_symbol, m_date, price) values ' + chain
            + " ON CONFLICT (m_symbol, m_date) DO UPDATE SET price = EXCLUDED.price")
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Insert mf history failed")
    

def get_mf_report_dates(m_symbol):
    """
    Outputs the dates of the reports from most recent to the oldest
    Example: ['20171130', '20170831', '20170531', '20170228']
    """
    cur = db_cursor()
    op_string = ("SELECT DISTINCT h_date FROM holdings WHERE m_symbol = '%s' ORDER BY 1 DESC"
        % m_symbol)
    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)

    rows = cur.fetchall()
    out_arr = []

    for row in rows:
        out_arr.append(row[0].strftime('%Y%m%d'))

    return out_arr

def get_mf_holdings(m_symbol, date):
    """
    Return 2 lists: stocks held, num of shares of the corresponding stock
    """

    cur = db_cursor()

    op_string = ("SELECT c_symbol, shares FROM holdings WHERE m_symbol = '%s' AND h_date = '%s'"
        % (m_symbol, date))

    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)

    rows = cur.fetchall()
    num_shares_held = []
    stocks = []
    for row in rows:
        stocks.append(row[0])
        num_shares_held.append(row[1])

    return stocks, num_shares_held

def get_mf_other(m_symbol, date=time.strftime("%Y%m%d")):
    cur = db_cursor()
    op_string = ("SELECT total_stock, total_investment, total_net_assets, shares FROM mutual_fund_other" +
        " WHERE m_symbol = '%s' AND m_date <= '%s' ORDER BY m_date DESC LIMIT 1"
        % (m_symbol, date))

    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Cannot not get mf_other for the following")
        print (m_symbol, date)

    row = cur.fetchone()

    # Return total_stock, total_investment, total_net_assets, shares
    return row[0], row[1], row[2], row[3]


def get_company_list():

    cur = db_cursor()
    op_string = "SELECT c_symbol FROM company"
    try: 
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)

    rows = cur.fetchall()
    assert(rows is not None)
    output_list = []
    for row in rows:
        # Ignore weird ass symbols
        # if row[0].isalpha():
        output_list.append(row[0])

    return output_list


def get_mf_list_scraper():

    cur = db_cursor()
    op_string = "SELECT m_symbol FROM mutual_fund WHERE follow = 'True'"
    try: 
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)

    rows = cur.fetchall()
    assert(rows is not None)
    output_list = []

    for row in rows:
        output_list.append(row[0])

    return output_list


def get_mf_list():

    cur = db_cursor()
    op_string = ("""SELECT DISTINCT m.m_symbol FROM mutual_fund m 
        LEFT JOIN children c 
        ON c.child_symbol = m.m_symbol
         WHERE follow = 'True' 
         AND c.parent_symbol IS NULL;""")

    try: 
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)

    rows = cur.fetchall()
    assert(rows is not None)
    
    output_list = [row[0] for row in rows]

    return output_list


def follow_mf(ticker_list):
    """
    Follow a mutual fund by change the "follow" in table mutual_fund
    Input: a ticker and a list of ticker
    """

    if isinstance(ticker_list, list):
        op_string = "UPDATE mutual_fund SET follow = 'True' WHERE False"
        for ticker in ticker_list:
            op_string += " or m_symbol = '%s'" % ticker
    else:
        op_string = ("UPDATE mutual_fund SET follow = 'True' WHERE m_symbol = '%s'" %
            ticker_list)

    cur = db_cursor()
    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)


def unfollow_mf(ticker_list):
    """
    Unfollow a mutual fund by change the "follow" in table mutual_fund
    Input: a ticker and a list of ticker
    """

    if isinstance(ticker_list, list):
        op_string = "UPDATE mutual_fund SET follow = 'False' WHERE False"
        for ticker in ticker_list:
            op_string += " or m_symbol = '%s'" % ticker
    else:
        op_string = ("UPDATE mutual_fund SET follow = 'False' WHERE m_symbol = '%s'" %
            ticker_list)

    cur = db_cursor()
    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)



def get_db_mf_nav(ticker, date=time.strftime("%Y%m%d")):
    cur = db_cursor()
    symbol = ticker.upper()

    op_string = ("""SELECT price, m_date FROM mutual_fund_history 
        WHERE m_symbol = '%s' AND m_date <= '%s' AND price IS NOT NULL 
        ORDER BY m_date DESC LIMIT 1""" % (symbol, date))

    cur.execute(op_string)
    row = cur.fetchone()

    if row:
        if row[1].strftime("%Y%m%d") != str(date):
            print ("Warning: Using an older date automatically for %s (%s instead of %s)"
                % (ticker, row[1].strftime("%Y%m%d"), date))
    else:
        print("Error: DB has no data of %s" % ticker)
        return -1
        exit(1)

    return float(row[0])


def get_db_stock_quote(ticker, date):
    cur = db_cursor()
    op_string = "SELECT price, s_date FROM stock_history WHERE c_symbol = '%s' AND s_date <= '%s' ORDER BY s_date DESC" % (ticker, date)
    cur.execute(op_string)
    row = cur.fetchone()

    try:
        if row[1].strftime("%Y%m%d") != str(date):
            print ("Warning: Using an older date automatically(%s instead of %s)"
                % (row[1].strftime("%Y%m%d"), str(date)))
        ret = float(row[0])
    except TypeError:
        print ("Cannot get stock quote %s %s" % (ticker, str(date)))
        return float(-1)

    return ret


def add_mf_stock_assets(ticker, date, stock_assets):
    cur = db_cursor()
    op_string = ("""INSERT INTO mutual_fund_history(m_symbol, m_date, stock_assets) 
        values ('%s', '%s', '%s')
         ON CONFLICT (m_symbol, m_date) 
         DO UPDATE SET stock_assets = EXCLUDED.stock_assets"""
         % (ticker, date, stock_assets))
    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Insert stocks prices failed")


def add_mf_other(report):
    """
    Upload the other information (total investment, total net assets, shares) 
        to the "mutual_fund_other" table in the database
    Input: m_symbol, m_date, total_investment, total_net_assets, shares
    Output: None 
    """
    m_symbol = report["symbol"]
    m_date = report["date"]
    total_investment = report["total_investment"]
    total_stock = report["total_stock"]
    total_net_assets = report["total_net_assets"]
    shares = report["num_shares"]
    cur = db_cursor()
    op = ("""INSERT INTO mutual_fund_other(m_symbol, m_date, total_stock, 
        total_investment, total_net_assets, shares) 
        VALUES ('%s', '%s', '%s', '%s', '%s', '%s') 
        ON CONFLICT(m_symbol, m_date) DO UPDATE SET 
        total_stock = EXCLUDED.total_stock, 
        total_investment = excluded.total_investment, 
        total_net_assets = EXCLUDED.total_net_assets, 
        shares = EXCLUDED.shares"""
        % (m_symbol, m_date, total_stock, total_investment,
            total_net_assets, shares) )
    try:
        cur.execute(op)
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Cannot add the following mf other")
        print (m_symbol, m_date, total_investment, total_net_assets, shares)


def add_mf_report(report):
    """
    Upload the report to the database
    Input: A dictionary (the report)
    Output: None
    """

    m_symbol = report["symbol"]
    date = report["date"]

    name_dict = json.load(open("predictions_database/stock_name_list.json",'r'))
    name_list = name_dict.keys()

    tuple_list=[]
    for holding in report["stocks"]:
        ticker = get_ticker(holding["company"])

        price = get_db_stock_quote(ticker, date)

        if math.ceil(holding["shares"] * price) != holding["value"]:
            print ("OMG!! Incorrect Stock Data %s %s" % (holding["company"], ticker))
            # print ("%s vs %s" % ( str(math.ceil(holding["shares"] * price)), str(holding["value"])))

        tuple_list.append((ticker, m_symbol, holding["shares"], date))


    # A faster way     
    cur = db_cursor()
    chain = ','.join(cur.mogrify('(%s,%s,%s,%s)', row).decode('utf-8') for row in tuple_list)
    try:
        cur.execute('INSERT INTO holdings(c_symbol, m_symbol, shares, h_date) values '
            + chain + """ ON CONFLICT(c_symbol, m_symbol, h_date) 
            DO UPDATE SET shares = EXCLUDED.shares""")
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Insert mf holding failed")

    # Populate mf_other
    # m_symbol, m_date, total_investment, total_net_assets, shares
    add_mf_other(report)

def add_children_fund(parent_symbol, child_symbol, ratio):
    """
    Get the children fund of a big fund
    (For example Jensen Quality Growth Fund a collection of 4 funds)

    """
    cur = db_cursor()
    op_string = ("""INSERT INTO children(parent_symbol, child_symbol, ratio) values ('%s', '%s', '%s') 
        ON CONFLICT(parent_symbol, child_symbol) DO UPDATE SET ratio = EXCLUDED.ratio"""
        % (parent_symbol, child_symbol, ratio))

    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Cannot add children fund %s to %s " % (child_symbol, parent_symbol))



def get_mf_name(m_symbol):
    cur = db_cursor()
    op_string = "SELECT m_name FROM mutual_fund WHERE m_symbol = '%s'" % m_symbol
    
    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Cannot get %s name" % m_symbol)

    row = cur.fetchone()

    return str(row[0])


def get_mf_parent_nav(ticker):
    cur = db_cursor()
    op_string = ("""SELECT H2.m_symbol, C.ratio, H2.price, H2.m_date FROM 
        (SELECT H1.m_symbol, MAX(H1.m_date) AS max_date FROM mutual_fund_history H1 
        GROUP BY H1.m_symbol) AS T1 
        JOIN mutual_fund_history H2 
        ON H2.m_symbol = T1.m_symbol AND H2.m_date = T1.max_date 
        JOIN children C 
        ON C.child_symbol = H2.m_symbol 
        WHERE C.parent_symbol = '%s'""" % ticker)
    
    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)
        print ("Cannot get parent nav" % ticker)

    rows = cur.fetchall()
    nav = 0
    for row in rows:
        nav += row[1]*row[2]

    return nav


def estimate_stock_asset(ticker, date=time.strftime("%Y%m%d")):
    """
    Estiamte the stock asset of a given ticker and a date
    date=0 by default and it means getting the most recent result
    """

    # Return total_stock, total_investment, total_net_assets, shares
    total_stock, _, total_net_assets, shares = get_mf_other(ticker, date)
    other_assets = total_net_assets - total_stock

    nav = float(get_db_mf_nav(ticker, date))
    return ((nav * shares) - other_assets)


def get_children(ticker):
    """
    Get the children fund of a collection fund
    """
    cur = db_cursor()
    op_string = ("""SELECT child_symbol FROM children WHERE parent_symbol = '%s'""" % ticker)

    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print(e.pgerror)
        print("Cannot can children funds")

    rows = cur.fetchall()

    result = []
    if rows:
        result = [row[0] for row in rows]

    return result


def get_sibling(ticker):
    """
    Get the sibling funds in the collection fund
    """
    cur = db_cursor()
    op_string = ("""SELECT C2.child_symbol FROM children C1 
        JOIN children C2 
        ON C1.parent_symbol = C2.parent_symbol 
        WHERE C1.child_symbol = '%s'"""
        % ticker)

    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print(e.pgerror)
        print("Cannot can sibling funds")

    rows = cur.fetchall()

    result = []
    if rows:
        result = [row[0] for row in rows]

    return result









