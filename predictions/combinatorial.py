"""
module to run combinatorial.cpp as needed
this is here to make it easier to interface with the db
essentially bridges the gap between our python and C++ code
"""

import os
import sys
import json
import datetime as dt
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import get_mf_list, get_mf_report_dates, get_mf_holdings, get_db_stock_quote, estimate_stock_asset

def find_closest_quarter(mf_symbol, date):
	"""
	find the closest quarter date for mf_symbol preceeding date
	return dt.datetime
	"""
	min_day_count = 500
	quarter_date = ""
	for quarter in get_mf_report_dates(mf_symbol):
		quarter_begin = dt.datetime(int(quarter[:4]), int(quarter[4:6]), int(quarter[6:]))
		day_count = (date - quarter_begin).days
		if day_count < min_day_count:
			min_day_count = day_count
			quarter_date = quarter_begin

	return quarter_date

def save_tmp_data(mf_symbol, date):
	"""
	load data from db and save to temp file
	this is done so that combinatorial.cpp can read in the necessary data
	format of temp file is:
	num_holdings
	sym1
	...
	num_shares_held1
	...
	prices1
	...
	stock_assets
	"""
	# load symbols, prices, num_shares_held, stock_assets
	# if beginning of quarter, get holdings from db
	if mf_symbol + "_comb.json" not in list(os.walk("/root/StackReport/predictions/Output"))[0][2]:
		# find quarter date closest to date
		query_date = find_closest_quarter(mf_symbol, date)			
		symbols, num_shares_held = get_mf_holdings(mf_symbol, query_date)
		num_shares_held = [str(num) for num in num_shares_held]
	# otherwise load from last day's prediction
	else:
		# load data from file
		with open("/root/StackReport/predictions/Output/" + mf_symbol + "_comb.json") as file:
			prediction = json.load(file)["securities"]
		
		symbols = [security["security_id"] for security in prediction]
		num_shares_held = [str(security["amount"]) for security in prediction]
	
	date = str(date)[:10].replace("-", "")
	prices = []
	for symbol in symbols:
		prices.append(str(get_db_stock_quote(symbol, date)))

	stock_assets = str(estimate_stock_asset(mf_symbol, date))

	output_string = str(len(symbols)) + "\n"
	output_string += "\n".join(symbols) + "\n"
	output_string += "\n".join(num_shares_held) + "\n"
	output_string += "\n".join(prices) + "\n"
	output_string += stock_assets
	with open("/root/StackReport/predictions/tmp/" + mf_symbol + ".txt", "w") as file:
		file.write(output_string)
		
def run_prediction(mf_symbol, date):
	"""
	run a prediction for mf_symbol on date
	if date is not beginning of quarter and no previous prediction exists,
	run prediction from beginning of quarter up until date
	"""
	# no need to make a prediction on days we have the answer
	if str(date)[:10].replace("-", "") in get_mf_report_dates(mf_symbol):
		# clear output for mf_symbol
		os.system("rm /root/StackReport/predictions/Output/" + mf_symbol + "_comb.json 2> /dev/null")
		return
	
	# read in command line options for mf_symbol
	with open("/root/StackReport/predictions/Config/" + mf_symbol + ".txt") as file:
		options = file.read()

	save_tmp_data(mf_symbol, date)
	# run prediction
	os.system("./root/StackReport/predictions/combexe " + mf_symbol + " " + options)
	# delete temp file
	os.system("rm /root/StackReport/predictions/tmp/" + mf_symbol + ".txt")

def is_market_open(date):
	"""
	return True if markets were open on date, false otherwise
	"""
	#TODO don't make this completely reliant on aapl
	date_str = str(date)[:10]
	query_string = 'curl -sL "https://api.iextrading.com/1.0/stock/aapl/chart/2y" | grep -sc ' + date_str
	num = int(os.popen(query_string).read())

	return True if num == 1 else False

def main():
	# date is yyyymmdd
	date = sys.argv[1]
	date = dt.datetime(int(date[:4]), int(date[4:6]), int(date[6:]))
	# do nothing if market was closed that day
	if not is_market_open(date): return
	
	mf_symbols = get_mf_list()
	for mf_symbol in mf_symbols:
		if mf_symbol + "_comb.json" not in list(os.walk("/root/StackReport/predictions/Output"))[0][2]:
			prediction_date = find_closest_quarter(mf_symbol, date)
			while prediction_date != date:
				if is_market_open(prediction_date): run_prediction(mf_symbol, prediction_date)
				prediction_date = prediction_date + dt.timedelta(1)

		run_prediction(mf_symbol, date)

if __name__=="__main__":
	main()
