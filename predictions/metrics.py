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
	labels = {"symbol": (end_num_shares, 1), ...}
	"""
	begin_labels = get_mf_holdings(mf_symbol, quarter_begin)
	begin_labels = dict(zip(begin_labels[0], begin_labels[1]))
	end_labels = get_mf_holdings(mf_symbol, quarter_end)
	end_labels = dict(zip(end_labels[0], end_labels[1]))
	# labels maps a symbol to a tuple of final num_shares and buy/hold/sell status
	labels = {}
	for symbol in end_labels.keys():
		# set direction to 1 if end holdings > begin holdings
		# 0 if they are equal
		# -1 if reverse is true
		if symbol in begin_labels.keys():
			if end_labels[symbol] > begin_labels[symbol]: direction = 1
			elif end_labels[symbol] < begin_labels[symbol]: direction = -1
			else: direction = 0
		else: direction = 1

		labels[symbol] = (end_labels[symbol], direction)

	return labels

def get_directional_comb(comb_prediction, quarter_begin):
	"""
	gets directional combinatorial predictions for one day
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
		if (symbol, labels[symbol][0]) in comb_predictions[-1]: comb_accuracy += 1

	comb_accuracy = float(comb_accuracy)/float(len(labels.keys()))

	return comb_accuracy

def get_daily_accuracy(labels, regr_predictions, comb_predictions):
	"""
	return accuracy taking into consideration each day's prediction
	for each day's prediction, look at each change (buy or sell) and check
	print intermediate accuracies so we can see how prediction performs throughout the quarter
	return (regr_accuracy, comb_accuracy, comb_magnitude_accuracy)
	"""
	regr_accuracy = 0
	comb_accuracy = 0
	comb_magnitude_accuracy = 0
	num_regr = 0
	num_comb = 0
	for i in range(len(regr_predictions)):
		for symbol in regr_predictions[i]:
			num_regr += 1
			if symbol in labels.keys() and labels[symbol][1] == 1: regr_accuracy += 1

		for tup in comb_predictions[i]:
			num_comb += 1
			symbol = tup[0]
			if symbol in labels.keys() and labels[symbol][1] == tup[1]: 
				comb_accuracy += 1
				if labels[symbol][0] == tup[0]: comb_magnitude_accuracy += 1

		# print intermediate accuracies so we can see how accuracies vary throughout the quarter
		if (i+1)%5 == 0:
			print("Daily accuracy after " + str(i+1) + " days: regression = " + \
				str(regr_accuracy/num_regr) + ", combinatorial = " + str(comb_accuracy/num_comb) + \
				", combinatorial magnitude = " + str(comb_magnitude_accuracy/num_comb))

	return (regr_accuracy/num_regr, comb_accuracy/num_comb, comb_magnitude_accuracy/num_comb)

def calc_random_accuracy(labels, regr_predictions, comb_predictions, quarter_begin):
	"""
	calculate expected probability of getting correct prediction with a random classifier
	return (p_rand_regr, p_rand_comb)
	"""
	labels_buy_count = 0
	labels_hold_count = 0
	labels_sell_count = 0
	# count labels directions
	for symbol in labels:
		direction = labels[symbol][1]
		if direction == 1: labels_buy_count += 1
		if direction == 0: labels_hold_count += 1
		if direction == -1: labels_sell_count += 1

	# count regr directions
	regr_buy_count = 0
	# comb_pred has length of all predictions, not just buys. regr_predictions only has buys, so we need to use comb_pred here
	num_pred_total = len(comb_predictions[0])
	for regr_prediction in regr_predictions:
		regr_buy_count += len(regr_prediction)
		regr_not_buy_count += num_pred_total-len(regr_prediction)

	comb_buy_count = 0
	comb_hold_count = 0
	comb_sell_count = 0
	# count comb directions
	for comb_prediction in comb_predictions:
		directional_comb_pred = get_directional_comb(comb_prediction, quarter_begin)
		for tup in directional_comb_pred:
			direction = tup[1]
			if direction == 1: comb_buy_count += 1
			if direction == 0: comb_hold_count += 1
			if direction == -1: comb_sell_count += 1

	# calculate directional probabilities
	p_buy_label = labels_buy_count/len(labels)
	p_hold_label = labels_hold_count/len(labels)
	p_sell_label = labels_sell_count/len(labels)
	p_buy_regr = regr_buy_count/(regr_buy_count + regr_not_buy_count)
	p_not_buy_regr = regr_not_buy_count/(regr_buy_count + regr_not_buy_count)
	p_buy_comb = comb_buy_count/(comb_buy_count + comb_hold_count + comb_sell_count)
	p_hold_comb = comb_hold_count/(comb_buy_count + comb_hold_count + comb_sell_count)
	p_sell_comb = comb_sell_count/(comb_buy_count + comb_hold_count + comb_sell_count)

	# calculate random change probabilities
	p_rand_regr = p_buy_regr*p_buy_label + p_not_buy_regr*(p_hold_label+p_sell_label)
	p_rand_comb = p_buy_comb*p_buy_label + p_hold_comb*p_hold_label + p_sell_comb*p_sell_label
	
	return (p_rand_regr, p_rand_comb)

def get_kappa(labels, regr_predictions, comb_predictions, quarter_begin):
	"""
	compute cohen's kappa statistic for each day of the quarter, then return average
	kappa = (accuracy-random_guess_accuracy)/(1-random_guess_accuracy)
	"""
	p_rand_regr, p_rand_comb = calc_random_accuracy(labels, regr_predictions, comb_predictions, quarter_begin)
	regr_accuracy = 0
	comb_accuracy = 0
	num_regr = 0
	num_comb = 0
	for i in range(len(regr_predictions)):
		for symbol in regr_predictions[i]:
			num_regr += 1
			if symbol in labels.keys() and labels[symbol][1] == 1: regr_accuracy += 1

		for tup in comb_predictions[i]:
			num_comb += 1
			symbol = tup[0]
			if symbol in labels.keys() and labels[symbol][1] == tup[1]: comb_accuracy += 1

		# print intermediate kappas so we can see how they vary throughout the quarter
		if (i+1)%5 == 0:
			print("Daily kappa after " + str(i+1) + " days: regression = " + \
				str((regr_accuracy/num_regr-p_rand_regr)/(1-p_rand_regr)) + ", combinatorial = " + \
				str((comb_accuracy/num_comb-p_rand_comb)/(1-p_rand_comb)))

	return ((regr_accuracy/num_regr-p_rand_regr)/(1-p_rand_regr), (comb_accuracy/num_comb-p_rand_comb)/(1-p_rand_comb))
	
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
	
	# daily accuracy
	regr_accuracy, comb_accuracy, comb_magnitude_accuracy = get_daily_accuracy( \
		labels, regr_predictions, comb_predictions)
	print("Final daily accuracy for " + mf_symbol + " for quarter " + quarter_begin \
		+ "-" + quarter_end + ":")
	print("Regression: " + str(regr_accuracy))
	print("Combinatorial: " + str(comb_accuracy))
	print("Combinatorial magnitude: " + str(comb_magnitude_accuracy))

	# kappa statistic
	regr_kappa, comb_kappa = get_daily_accuracy(labels, regr_predictions, comb_predictions)
	print("Final kappa statistic for " + mf_symbol + " for quarter " + quarter_begin \
		+ "-" + quarter_end + ":")
	print("Regression: " + str(regr_kappa))
	print("Combinatorial: " + str(comb_kappa))
	print("Combinatorial magnitude: " + str(comb_magnitude_accuracy))

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
		quarters = get_mf_report_dates(mf_symbol)
		for i in range(len(quarters)-1):
			prediction = predict_quarter(mf_symbol, quarters[i], quarters[i+1])
			print_metrics(prediction, mf_symbol, quarters[i], quarters[i+1])
	
if __name__=="__main__":
	main()
