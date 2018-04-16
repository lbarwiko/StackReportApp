import sys
import json
import time
import urllib.request
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import *
from scrapers.mfscrapers.helper import * 

def is_numeric(str_input):
    try:
        float(str_input)
        return True
    except ValueError:
        return False

def get_nav_historical_yahoo(ticker):
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


def upload_nav_historical_yahoo(ticker):

	list = get_nav_historical_yahoo(ticker)
	# convert into tuple list ((m_symbol, m_date, price), ...)
	tuple_list = []
	for each in list:
		try:
			if "close" in each:
				date = time.strftime("%Y%m%d", time.gmtime(float(each["date"])))
				tup = (ticker, date, float(each["close"]))
				tuple_list.append(tup)
		except:
			print("Cannot get %s nav on %s" % (ticker, date))
	add_tuple_mf_history(tuple_list)


def get_nav_yahoo(ticker):
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

	return float(-1)


def save_all_nav_daily(tickers):
	"""
	Update all mutual fund nav using yahoo
	"""
	tuple_list = []
	for ticker in tickers:
		nav = get_nav_yahoo(ticker)
		date = time.strftime("%Y%m%d")
		tuple_list.append((ticker, date, nav))

	add_tuple_mf_history(tuple_list)

def main():
	# TODO load tickers from database
	# with open("stock_symbol_list.json") as file:
	# tickers = json.loads(file.read()).keys()

	tickers = get_mf_list()

	if len(sys.argv) != 2:
		print("Invalid usage, must have exactly one argument")
		return

	mode = sys.argv[1]

	if mode == "historical":
		save_all_nav_historical(tickers)
	elif mode == "daily":
		save_all_nav_daily(tickers)
	else:
		print("Invalid usage, argument must be historical or daily")


if __name__ == '__main__':
	main()