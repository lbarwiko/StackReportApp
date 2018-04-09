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
from predictions_database.helper import get_mf_list, get_mf_report_dates, get_mf_holdings, get_db_stock_quote, get_db_mf_stock_assets

def save_tmp_data(mf_symbol, date):
	"""
	load data from db and save to temp file
	this is done so that combinatorial.cpp can read in the necessary data
	"""
	# load symbols, prices, num_shares_held, stock_assets
	# if beginning of quarter, get holdings from db
	if mf_symbol + "_comb.json" not in list(os.walk("/root/StackReport/predictions/Output"))[0][2]:
		# find quarter date closest to date
		min_day_count = 500
		query_date = ""
		for quarter in get_mf_report_dates(mf_symbol):
			quarter_begin = dt.datetime(int(quarter[:4]), int(quarter[4:6]), int(quarter[6:]))
			day_count = (date - quarter_begin).days
			if day_count < min_day_count:
				min_day_count = day_count
				query_date = quarter_begin
			
		symbols, num_shares_held = get_mf_holdings(mf_symbol, query_date)
	# otherwise load from last day's prediction
	else:
		# load data from file
		with open("/root/StackReport/predictions/Output/" + mf_symbol + "_comb.json") as file:
			prediction = json.load(file)["securities"]
		
		symbols = [security["security_id"] for security in prediction]
		num_shares_held = [str(security["amount"]) for security in prediction]
		
	prices = []
	for symbol in symbols:
		prices.append(str(get_db_stock_quote(symbol, date)))

	stock_assets = str(get_db_mf_stock_assets(mf_symbol, date))

	output_string = str(len(symbols)) + "\n"
	output_string += "\n".join(symbols) + "\n"
	output_string = str(len(num_shares_held)) + "\n"
	output_string += "\n".join(num_shares_held) + "\n"
	output_string = str(len(prices)) + "\n"
	output_string += "\n".join(prices) + "\n"
	output_string += stock_assets
	with open("/root/StackReport/predictions/tmp/" + mf_symbol + ".txt", "w") as file:
		file.write(output_string)
		
def run_prediction(mf_symbol, date):
	"""
	run a prediction for mf_symbol on date
	"""
	# no need to make a prediction on days we have the answer
	if (str(date.year)+str(date.month)+str(date.day)) in get_mf_report_dates(mf_symbol):
		# clear output for mf_symbol
		os.system("rm /root/StackReport/predictions/Output/" + mf_symbol + "_comb.json")
		return
	
	# read in command line options for mf_symbol
	with open("/root/StackReport/predictions/Config/" + mf_symbol + ".txt") as file:
		options = file.read()

	save_tmp_data(mf_symbol, date)
	# run prediction
	os.system("./root/StackReport/predictions/combexe " + mf_symbol + " " + options)
	# delete temp file
	os.system("rm /root/StackReport/predictions/tmp/" + mf_symbol + ".txt")

def main():
	# date is yyyymmdd
	date = sys.argv[1]
	date = dt.datetime(int(date[:4]), int(date[4:6]), int(date[6:]))
	mf_symbols = get_mf_list()
	for mf_symbol in mf_symbols:
		run_prediction(mf_symbol, date)

if __name__=="__main__":
	main()
