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
from config import *
import urllib.request

def load_stock_historical(ticker):
	"""
	load all available historical price data for ticker (up to 20 years)
	ticker is a string such as "MSFT"
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
	url = ALPHA_BASE_URL + ticker + "&outputsize=full&apikey=" + API_KEY
	with urllib.request.urlopen(url) as file:
		data = json.loads(file.read().decode())

	return data
	
def save_all_stock_historical(tickers):
	"""
	load all available historical price data for each ticker in tickers (up to 20 years)
	place in database
	tickers is list of ticker symbol strings
	"""
	for ticker in tickers:
		data = load_stock_historical(ticker)
		# TODO place in database

def load_stock_daily(ticker):
	"""
	load last daily closing price data for ticker
	ticker is a string such as "MSFT"
	return price
	"""
	url = ALPHA_BASE_URL + ticker + "&outputsize=compact&apikey=" + API_KEY
	with urllib.request.urlopen(url) as file:
		data = json.loads(file.read().decode())

	return data


def main():
	with open("stock_tickers.json") as file:
		tickers = json.loads(file.read()).keys()

	if len(sys.argv) != 2:
		print("Invalid usage, must have exactly one argument")
		return

	mode = sys.argv[1]

	if mode == "historical":
		save_all_stock_historical(tickers)
	elif mode == "daily":
		save_all_stock_daily(tickers)
	else:
		print("Invalid usage, argument must be historical or daily")
