"""
module to gather performance metrics for predictions
"""

import os
import sys
import json
import datetime as dt
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import get_mf_list, get_mf_report_dates, get_mf_holdings

def get_labels(mf_symbol, quarter_begin, quarter_end):
	"""
	get true labels of mf_symbol for quarter
	labels = [{"symbol": (end_num_shares, 1)}, ...]
	"""
	begin_labels = get_mf_holdings(mf_symbol, quarter_begin)
	begin_labels = dict(zip(begin_labels[0], begin_labels[1]))
	end_labels = get_mf_holdings(mf_symbol, quarter_end)
	end_labels = dict(zip(end_labels[0], end_labels[1]))
	# labels maps a symbol to a tuple of final num_shares and buy/hold/sell status
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

	return labels

def get_directional_comb(comb_prediction, quarter_begin):
	"""
	calculates directional combinatorial predictions for one day
	return [(symbol, 1)]
	"""
	begin_labels = get_mf_holdings(mf_symbol, quarter_begin)
	begin_labels = dict(zip(begin_labels[0], begin_labels[1]))
	directional_comb_predictions = []
	for tup in comb_predictions:
		symbol = tup[0]
		if tup[1] > begin_labels[symbol]: pred = (symbol, 1)
		elif tup[1] < begin_labels[symbol]: pred = (symbol, -1)
		else: pred = (symobl, 0)

		directional_comb_predictions.append(pred)

	return directional_comb_predictions

def get_directional_accuracy(labels, regr_predictions, directional_comb_predictions):
	"""
	calculate accuracy of mf_symbol for quarter
	only use directional accuracy (simply considers buy, sell, hold
	and not actual quantities traded)
	return (regr_accuracy, comb_accuracy)
	"""
	# calculate overall directional accuracy, so use only final day's prediction
	regr_accuracy = 0
	comb_accuracy = 0
	
	for symbol in labels.keys():
		# increment regr if correct buy prediction or if correctly predicted not buy
		if labels[symbol][1] == 1 and symbol in regr_predictions[-1]: regr_accuracy += 1
		if labels[symbol][1] != 1 and symbol not in regr_predictions[-1]: regr_accuracy += 1

		# increment comb if correct direction predicted
		if (symbol, labels[symbol][1]) in directional_comb_predictions: comb_accuracy += 1

	regr_accuracy = float(regr_accuracy)/float(len(labels.keys()))
	comb_accuracy = float(comb_accuracy)/float(len(labels.keys()))
	
	return (regr_accuracy, comb_accuracy)

def get_magnitude_accuracy(labels, comb_predictions):
	"""
	calculate accuracy of mf_symbol for quarter
	only use magnitude accuracy (simply considers actual quantities traded 
	and not buy, sell, hold)
	return comb_accuracy
	"""
	# calculate overall magnitude accuracy, so use only final day's prediction
	comb_accuracy = 0
	for symbol in labels.keys():
		if (symbol, labels[symbol][0]) in comb_predictions[-1]): comb_accuracy += 1

	comb_accuracy = float(comb_accuracy)/float(len(labels.keys()))

	return comb_accuracy

def print_metrics(prediction, mf_symbol, quarter_begin, quarter_end):
	"""
	print performance metrics for quarter for mf_symbol
	"""
	labels = get_labels(mf_symbol, quarter_begin, quarter_end)
	regr_predictions = prediction[0]
	comb_predictions = prediction[1]

	# directional accuracy
	directional_comb_predictions = get_directional_comb(comb_predictions[-1], quarter_begin)
	regr_accuracy, comb_accuracy = get_directional_accuracy(labels, regr_predictions, \
		directional_comb_predictions)
	print("Final directional accuracy for " + mf_symbol + " for quarter " + quarter_begin \
		+ "-" + quarter_end + ":")
	print("Regression: " + str(regr_accuracy))
	print("Combinatorial: " + str(comb_accuracy))
	
	# magnitude accuracy
	comb_accuracy = get_magnitude_accuracy(labels, comb_predictions)
	print("Final magnitude accuracy for " + mf_symbol + " for quarter " + quarter_begin \
		+ "-" + quarter_end + ":")
	print("Combinatorial: " + str(comb_accuracy))
	
	return

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
			num_shares_held = [str(security["amount"]) for security in perediction]
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
