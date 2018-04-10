"""
module to retrieve stock price data
run historical mode to save historical data
run daily mode to save last daily data
usage:
	python stock_scraper.py historical
	python stock_scraper.py daily
"""

import sys
import json
import time
from config import *
import requests
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import add_tuple_mf_history, get_mf_list, get_mf_parent_nav

def get_single_mf_nav(ticker):
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

def load_mf_historical(ticker):
	"""
	load all available historical price data for ticker (up to 20 years)
	tickers is a string such as "MSFT"
	return json
	{
	"Meta Data": {
		"1. Information": "Daily Prices (open, high, low, close) and Volumes",
		"2. Symbol": "MSFT",
		"3. Last Refreshed": "2018-02-06",
		"4. Output Size": "Full size",
		"5. Time Zone": "US/Eastern"
	},
	"Time Series (Daily)": {
		"2018-02-06": {
			"1. open": "86.8900",
			"2. high": "91.4750",
			"3. low": "85.2500",
			"4. close": "91.3300",
			"5. volume": "67969320"
	},
	"""
	url = ALPHA_BASE_URL + "TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=full&apikey=" + API_KEY
	response = requests.get(url)
	try:
		data = json.loads(response.text)
	except Exception as e:
		print("Loading historical nav failed")
		print(e)
	# don't query alphavantage too quickly
	time.sleep(5)

	return data
	
def save_all_mf_historical(tickers):
	"""
	load all available historical price data for each ticker in tickers (up to 20 years)
	place in database
	tickers is list of ticker symbol strings
	"""
	for ticker in tickers:
		if len(ticker) < 6:
			data = load_mf_historical(ticker)

			# tuple_list is a list of tuples [(m_symbol, m_date, price),...,]
			tuple_list = []
			for key, value in data["Time Series (Daily)"].items():
				tup = (ticker, key, value["4. close"])
				tuple_list.append(tup)

			add_tuple_mf_history(tuple_list)


def split_stocks(tickers):
	"""
	returns a list of strings of 100 ticker symbols, delimited by commas
	["ABC,AAC,AFC,...", "CDE,CCE,CGE,...", ...]
	"""
	strings = []
	string = ""
	for i in range(len(tickers)):
		# every 100 stocks, append string
		if i % 100 == 0:
			if string != "": 
				strings.append(string[:-1])
				
			string = ""

		string += tickers[i] + ","

	strings.append(string[:-1])

	return strings
		
def load_mf_daily(ticker):
	"""
	load the most recent quote
	{
    "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "JENSX",
        "3. Last Refreshed": "2018-03-19",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2018-03-19": {
            "1. open": "47.8500",
            "2. high": "47.8500",
            "3. low": "47.8500",
            "4. close": "47.8500",
            "5. volume": "0"
        },
        "2018-03-16": {
            "1. open": "48.4600",
            "2. high": "48.4600",
            "3. low": "48.4600",
            "4. close": "48.4600",
            "5. volume": "0"
        },
	...
	]	
	"""

	url = ALPHA_BASE_URL + "TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=" + API_KEY
	response = requests.get(url)
	try:
		data = json.loads(response.text)
	except Exception as e:
		print(e)
		print(response)

	# don't query alphavantage too quickly
	time.sleep(5)
	if "Error Message" in data or "Information" in data:
		print("Cant get %s data from alpha" % ticker)
		print(data)
	lastest = data["Meta Data"]["3. Last Refreshed"]

	return str(lastest), str(data["Time Series (Daily)"][lastest]["4. close"])

# TODO FIX SPECIAL CASE
def save_all_mf_daily(tickers):
	"""
	load all available historical price data for each ticker in tickers (up to 20 years)
	place in database
	tickers is list of ticker symbol strings
	"""
	tuple_list = []
	for ticker in tickers:
		if len(ticker) < 6:
			date, price = load_mf_daily(ticker)
			tup = (ticker, date, price)
			tuple_list.append(tup)

	add_tuple_mf_history(tuple_list)

	tuple_list = []
	for ticker in tickers:
		if len(ticker) >= 6:
			tuple_list.append((ticker, time.strftime("%Y%m%d"), get_mf_parent_nav(ticker)))

	add_tuple_mf_history(tuple_list)



def main():
	# TODO load tickers from database
	#with open("stock_symbol_list.json") as file:
		#tickers = json.loads(file.read()).keys()

	tickers = get_mf_list()
	if len(sys.argv) != 2:
		print("Invalid usage, must have exactly one argument")
		return

	mode = sys.argv[1]

	if mode == "historical":
		save_all_mf_historical(tickers)
	elif mode == "daily":
		save_all_mf_daily(tickers)
	else:
		print("Invalid usage, argument must be historical or daily")

if __name__=="__main__":
	main()
