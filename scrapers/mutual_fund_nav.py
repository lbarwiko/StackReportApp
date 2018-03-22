import sys
sys.path.append(sys.path[0]+"/../")
from mfscrapers.helper import get_soup
import time
from bs4 import BeautifulSoup
import re
import json
from predictions_database.helper import add_tuple_mf_history
import time

def is_numeric(str_input):
    try:
        float(str_input)
        return True
    except ValueError:
        return False

def get_quote_historical(ticker):
	"""
	get all the historical data (including the newest)
	example. {"date":718896600,"open":9.630000114440918,"high":9.630000114440918,
				"low":9.630000114440918,"close":9.630000114440918,"volume":0,"adjclose":5.044559955596924}
	"""
	pattern = re.compile(r"root\.App\.main = (.*);", re.MULTILINE)

	today_time = int(time.time())

	url = "https://finance.yahoo.com/quote/%s/history?period1=0&period2=%d&interval=1d&filter=history&frequency=1d" % (ticker, today_time)
	soup = get_soup(url)

	script = soup.find("script", text=lambda x: x and "root.App.main" in x).text
	data = json.loads(re.search(pattern, script).group(1))
	return data["context"]["dispatcher"]["stores"]["HistoricalPriceStore"]["prices"]

def upload_mf_historical(ticker):

	result = get_quote_historical(ticker)
	# convert into tuple list ((m_symbol, m_date, price), ...)
	tuple_list = []

	for each in result:
		if "date" in each and "close" in each:
			if each["date"] is not None and each["close"] is not None:
				date = time.strftime("%Y%m%d", time.gmtime(float(each["date"])))
				try:
					tup = (ticker, date, float(each["close"]))
				except TypeError:
					print (each)

				tuple_list.append(tup)

	tuple_list = list(set(tuple_list))


	add_tuple_mf_history(tuple_list)



def get_quote(ticker):
	"""
	return the nav of ticker as a float
	"""
	url = "https://finance.yahoo.com/quote/%s/" % (ticker)
	soup = get_soup(url)
	soup = soup.find("div", id="quote-header-info")
	soup = soup.find_all("span")

	for s in soup:
		s = s.get_text()
		if is_numeric(s):
			return float(s)


	raise ValueError('Cannot get %s quote from yahoo' % ticker)
	return float(-1)

def print_dict(d):
	for key, value in d.items():
		print('\t' + str(key))

def main():
	return 0 

if __name__ == '__main__':
    main()