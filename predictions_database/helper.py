import psycopg2
from config import DBCONFIG
import os
import json
import sys
import Levenshtein
import re
import datetime 
sys.path.append(sys.path[0]+"../")


def test():
    print ("YOOOO")

def db_cursor():
    try:
    	conn = psycopg2.connect("dbname='%s' user='%s' password='%s' host='%s' port='%d'" % 
    		(DBCONFIG['dbname'], DBCONFIG['user'], DBCONFIG['password'], DBCONFIG['host'], DBCONFIG['port']))
        conn.autocommit = True

    except:
        print ("I am unable to connect to the database.")
    
    return conn.cursor()

def add_single_stock(symbol, name):
    name = name.replace("'", "''")
    cur = db_cursor()
    op_string = "INSERT INTO company(c_symbol, c_name) VALUES ('%s', '%s');" % (symbol, name)
    print op_string
    try:
        cur.execute(op_string)
    except:
        print ("Insert new stocks failed")

def add_single_mf_holding(m_symbol, c_symbol, date, shares):
    cur = db_cursor()
    op_string = ("INSERT INTO holdings(c_symbol, m_symbol, h_date, shares) VALUES ('%s', '%s', '%s', '%s');" 
        % (m_symbol, c_symbol, date, shares))
    try:
        cur.execute(op_string)
    except:
        print ("Insert mf holding failed")

def get_ticker(cname, name_list, name_dict):

    min = 9999999999
    min_name = ""
    clean_cname = sanitize_company(cname.lower())

    for company in name_list:
        clean_company = sanitize_company(company.lower())
        d = Levenshtein.distance(str(clean_cname), str(clean_company)) 
        if d < min:
            min = d
            min_name = company
    return (name_dict[min_name])

def sanitize_company(company_name):
    output = company_name.replace("(a)", '')
    output = output.replace("(b)", '')
    output = output.replace(" class ", '')
    output = company_name.replace("the", '')
    output = output.replace("incorporated", 'inc')
    output = re.sub(r'[^\w\s]','',output)
    return output

def add_tuple_mf_report(tuple_list):
    return 0

def add_mf_report(m_symbol, report, date):
    """
    input: mf symbol, standard scrapped report, date in yyyymmdd
    """

    name_dict = json.load(open("predictions_database/stock_name_list.json",'r'))
    name_list = name_dict.keys()

    tuple_list=[]
    for holding in report["stocks"]:
        ticker = get_ticker(holding["company"], name_list, name_dict)
        tuple_list.append((ticker, m_symbol, holding["shares"], date))
        # cur = db_cursor()
        # op_string = ("INSERT INTO holdings(c_symbol, m_symbol, shares, h_date) VALUES ('%s','%s','%s','%s');" 
        #     % (ticker, m_symbol, holding["shares"], date))
        # try:
        #     print(op_string)
        #     cur.execute(op_string)
        #     print("Successfully Uploaded MF report to DB!")
        # except psycopg2.Error as e:
        #     print ("Insert mf holding failed")
        #     print (e.pgerror)        

    # A faster way     
    cur = db_cursor()
    chain = ','.join(cur.mogrify('(%s,%s,%s,%s)', row) for row in tuple_list)
    print chain
    try:
        cur.execute('insert into holdings(c_symbol, m_symbol, shares, h_date) values ' + chain)
        print("Successfully Uploaded MF report to DB!")
    except:
        print ("Insert mf holding failed")

def add_tuple_mf_history(tuple_list):

    cur = db_cursor()
    chain = ','.join(cur.mogrify('(%s,%s,%s)', row) for row in tuple_list)

    try:
        cur.execute('insert into mutual_fund_history(m_symbol, m_date, price) values ' + chain)
        print("Successfully uploaded MF history to DB!")
    except:
        print ("Insert mf holding failed")
    

def get_mf_report_date(m_symbol):
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

    for row in rowsw('%Y%m%d')

    return out_arr

def get_mf_report(m_symbol, date):

    cur = db_cursor()
    op_string = ("SELECT * FROM holdings WHERE m_symbol = '%s' AND h_date = '%s'"
        % (m_symbol, date))

    try:
        cur.execute(op_string)
    except psycopg2.Error as e:
        print (e.pgerror)






