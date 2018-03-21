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
from predictions_database.helper import add_tuple_stock_history, get_company_list

def load_stock_historical(ticker):
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
	data = json.loads(response.text)
	# don't query alphavantage too quickly
	time.sleep(2)

	return data
	
def save_all_stocks_historical(tickers):
	"""
	load all available historical price data for each ticker in tickers (up to 20 years)
	place in database
	tickers is list of ticker symbol strings
	"""
	for ticker in tickers:
		data = load_stock_historical(ticker)
		# TODO place in database

		# tuple_list is a list of tuples [(c_symbol, price, c_date),...,]
		tuple_list = []
		for key, value in data["Time Series (Daily)"].items():
			tup = (ticker, value["4. close"], key)
			tuple_list.append(tup)

		add_tuple_stock_history(tuple_list)


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
		
def load_stocks_daily(tickers):
	"""
	load last daily closing price data for tickers
	tickers is a list of string such as "MSFT"
	return [json]
	[{
	"Meta Data": {
		"1. Information": "Batch Stock Market Quotes",
		"2. Notes": "IEX Real-Time Price provided for free by IEX (https://iextrading.com/developer/).",
		"3. Time Zone": "US/Eastern"
	},
	"Stock Quotes": [
		{
			"1. symbol": "MSFT",
			"2. price": "94.4200",
			"3. volume": "34784139",
			"4. timestamp": "2018-03-13 16:53:45"
		},
		{
			"1. symbol": "FB",
			"2. price": "181.9100",
			"3. volume": "17949951",
			"4. timestamp": "2018-03-13 16:41:53"
		},
	...
	]	
	"""
	results = []
	for stock_string in split_stocks(tickers):
		url = ALPHA_BASE_URL + "BATCH_STOCK_QUOTES&symbols=" + stock_string + "&apikey=" + API_KEY
		response = requests.get(url)
		data = json.loads(response.text)

		results.append(data)
		# don't query alphavantage too quickly
		time.sleep(2)

	return results

def save_all_stocks_daily(tickers):
	"""
	load all available historical price data for each ticker in tickers (up to 20 years)
	place in database
	tickers is list of ticker symbol strings
	"""
	data = load_stocks_daily(tickers)
	# TODO place in database

	# tuple_list is a list of tuples [(c_symbol, price, c_date),...,]
	tuple_list = []
	for batch in data:
		for value in batch["Stock Quotes"]:
			tup = (value["1. symbol"], value["2. price"], value["4. timestamp"])
			tuple_list.append(tup)

	add_tuple_stock_history(tuple_list)

def main():
	# TODO load tickers from database
	#with open("stock_symbol_list.json") as file:
		#tickers = json.loads(file.read()).keys()

	tickers = get_company_list()

	if len(sys.argv) != 2:
		print("Invalid usage, must have exactly one argument")
		return

	mode = sys.argv[1]

	if mode == "historical":
		save_all_stocks_historical(tickers)
	elif mode == "daily":
		save_all_stocks_daily(tickers)
	else:
		print("Invalid usage, argument must be historical or daily")

if __name__=="__main__":
	main()
