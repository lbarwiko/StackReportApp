import urllib2
import json
import time
from bs4 import BeautifulSoup
import re
import sys
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import add_tuple_mf_history
import time

def is_numeric(str_input):
    try:
        float(str_input)
        return True
    except ValueError:
        return False

def get_nav_historical(ticker):
	"""
	get all the historical data (including the newest)
	example. {"date":718896600,"open":9.630000114440918,"high":9.630000114440918,
				"low":9.630000114440918,"close":9.630000114440918,"volume":0,"adjclose":5.044559955596924}
	"""
	pattern = re.compile(r"root\.App\.main = (.*);", re.MULTILINE)

	today_time = int(time.time())

	url = "https://finance.yahoo.com/quote/%s/history?period1=0&period2=%d&interval=1d&filter=history&frequency=1d" % (ticker, today_time)
	page = urllib2.urlopen(url)
	soup = BeautifulSoup(page, 'html.parser')

	script = soup.find("script", text=lambda x: x and "root.App.main" in x).text
	data = json.loads(re.search(pattern, script).group(1))
	return data["context"]["dispatcher"]["stores"]["HistoricalPriceStore"]["prices"]


def upload_nav_historical(ticker):

	list = get_nav_historical(ticker)
	# convert into tuple list ((m_symbol, m_date, price), ...)
	tuple_list = []
	for each in list:
		tup = (ticker, time.strftime("%Y%m%d", time.gmtime(float(each["date"]))), 
			float(each["close"]))
		tuple_list.append(tup)
	add_tuple_mf_history(tuple_list)


def get_nav(ticker):
	"""
	return the nav of ticker as a float
	"""
	url = "https://finance.yahoo.com/quote/%s/" % (ticker)
	page = urllib2.urlopen(url)
	soup = BeautifulSoup(page, 'html.parser')
	soup = soup.find("div", id="quote-header-info")
	soup = soup.find_all("span")

	for s in soup:
		s = s.get_text()
		if is_numeric(s):
			return float(s)

	return float(-1)

def print_dict(d):
	for key, value in d.items():
		print('\t' + str(key))

def main():
	return 0 

if __name__ == '__main__':
    main()