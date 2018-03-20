import json
from config import DBCONFIG

def generate_populate_stock_sql():
    """
    input: dict of {"AAPL": "apple, inc.", ... }
    """
    dict = json.load(open("scrapers/stock_symbol_list.json",'r'))

    f = open("predictions_database/sql/populate_stock.sql",'w+')

    f.write("\c %s \n" % DBCONFIG['dbname'])
    f.write("INSERT INTO company(c_symbol, c_name) VALUES\n")
    first = True
    for key, value in dict.iteritems():
        if first:
            f.write("('%s', '%s')" % (str(key).replace(" ",""), str(value).replace("'","''")))
            first = False
        else:
            f.write(",\n")
            f.write("('%s', '%s')" % (str(key).replace(" ",""), str(value).replace("'","''")))

    f.write(";")
    f.close()

def generate_populate_mutual_fund_sql():
    """
    input: dict of {"AAPL": "apple, inc.", ... }
    """
    dict = json.load(open("scrapers/mutual_fund_symbol_list.json",'r'))

    f = open("predictions_database/sql/populate_mutual_fund.sql",'w+')

    f.write("\c %s \n" % DBCONFIG['dbname'])
    f.write("INSERT INTO mutual_fund(m_symbol, m_name) VALUES\n")
    first = True
    for key, value in dict.iteritems():
        if first:
            f.write("('%s', '%s')" % (str(key).replace(" ",""), str(value).replace("'","''")))
            first = False
        else:
            f.write(",\n")
            f.write("('%s', '%s')" % (str(key).replace(" ",""), str(value).replace("'","''")))

    f.write(";")
    f.close()

def main():
	generate_populate_stock_sql()
	generate_populate_mutual_fund_sql()

if __name__ == '__main__':
	main()