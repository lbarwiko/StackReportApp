"""
module to gather performance metrics for predictions
"""

import os
import sys
import json
import datetime as dt
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import get_mf_list, get_mf_report_dates, get_mf_holdings

def print_metrics(prediction, mf_symbol, quarter_begin, quarter_end):
	"""
	print performance metrics for quarter for mf_symbol
	"""
	begin_labels = get_mf_holdings(mf_symbol, quarter_begin)
	begin_labels = dict(zip(begin_labels[0], begin_labels[1]))
	end_labels = get_mf_holdings(mf_symbol, quarter_end)
	end_labels = dict(zip(end_labels[0], end_labels[1]))
	# labels maps a symbol to a tuple of final num_shares and buy/hold/sell status
	# labels = {"symbol": (end_num_shares, 1)}
	labels = []
	for symbol in end_labels.keys():
		# set direction to 1 if end holdings > begin holdings
		# 0 if they are equal
		# -1 if reverse is true
		if symbol in begin_labels.keys():
			if end_labels[symbol] > begin_labels[symbol]: direction = 1
			elif end_labels[symbol] < begin_labels[symbol]: direction = -1
			else: direction = 0
		else: direction = 1
		labels.append({symbol: (end_labels[symbol], direction)})
		
	regr_predictions = prediction[0]
	comb_predictions = prediction[1]

	# calculate overall directional accuracy, so use only final day's prediction
	regr_accuracy = 0
	comb_accuracy = 0
	for symbol in labels.keys():
		# increment regr if correct buy prediction or if correctly predicted not buy
		if labels[symbol][1] == 1 and symbol in regr_predictions[-1]: regr_accuracy += 1
		if labels[symbol][1] != 1 and symbol not in regr_predictions[-1]: regr_accuracy += 1

		# increment comb if correct direction predicted
		if labels[symbol][1] == comb_predictions[-1]:
			comb_accuracy += 1

	regr_accuracy = float(regr_accuracy)/float(len(labels.keys()))
	comb_accuracy = float(comb_accuracy)/float(len(labels.keys()))
	
def predict_quarter(mf_symbol, quarter_begin, quarter_end):
	"""
	run regression and combinatorial predictions for the quarter
	return ([regr_predictions], [comb_predictions])
	a regr_prediction is [symbols]
	a comb_prediction is [(symbol, num_shares_held)]
	"""
	regr_predictions = []
	comb_predictions = []
	start_date = dt.datetime(quarter_begin[:4], quarter_begin[4:6], quarter_begin[6:])
	end_date = dt.datetime(quarter_end[:4], quarter_end[4:6], quarter_end[6:])
	day_count = (end_date - start_date).days

	# iterate through each day, run the prediction for that day, then gather results
	for current_date in (start_date + dt.timedelta(i) for i in range(day_count)):
		date_string = str(current_date.timetuple()[0]) + str(current_date.timetuple()[1]) + str(current_date.timetuple()[2])
		os.system("python3 /root/StackReport/prediction/regression.py " + date_string)
		os.system("python3 /root/StackReport/prediction/combinatorial.py " + date_string)
		with open("/root/StackReport/predictions/Output/" + mf_symbol + "_regr.json") as file:
			prediction = json.load(file)["securities"]
			symbols = [security["security_id"] for security in prediction]
			regr_predictions.append(symbols)			

		with open("/root/StackReport/predictions/Output/" + mf_symbol + "_comb.json") as file:
			prediction = json.load(file)["securities"]
			symbols = [security["security_id"] for security in prediction]
			num_shares_held = [str(security["amount"]) for security in prediction]
			comb_predictions.append(list(zip(symbols, num_shares_held)))

	return (regr_predictions, comb_predictions)
	
def main():
	mf_symbols = get_mf_list()
	for mf_symbol in mf_symbols:
		quarters = get_mf_report_dates(mf_symbol).reverse()
		for i in range(len(quarters)-1):
			prediction = predict_quarter(mf_symbol, quarters[i], quarters[i+1])
			print_metrics(prediction, mf_symbol, quarters[i], quarters[i+1])
	
if __name__=="__main__":
	main()
