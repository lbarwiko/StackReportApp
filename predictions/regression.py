"""
module to run linear regressions to predict mutual fund movements
fit a variety of linear regressions to the model of:
p1n1 + p2n2 + ... pdnd = stock_assets
where px is price of stock x and nx is number of shares of stock x
these regressions solve for N = [n1, n2, ..., nd]
"""

import numpy as np
import random as rand
from sklearn import linear_model

def get_model(type):
	"""
	return the appropriate regression model according to type
	we don't fit intercept since it doesn't match our model of 
	n1p1 + n2p2 + ... ndpd = stock_assets
	we also force positives when applicable because a mf can't hold negative shares
	"""
	if type == "linear":
		return linear_model.LinearRegression(fit_intercept=False)
	elif type == "ridge":
		return linear_model.Ridge(fit_intercept=False)
	elif type == "lasso":
		return linear_model.Lasso(fit_intercept=False, positive=True)
	elif type == "elastic net":
		return linear_model.ElasticNet(fit_intercept=False, positive=True)
	elif type == "lars":
		return linear_model.Lars(fit_intercept=False, positive=True)
	elif type == "lasso lars":
		return linear_model.LassoLars(fit_intercept=False, positive=True)
	#elif type == "omp":
		#return linear_model.OrthogonalMatchingPursuit(n_nonzero_coefs=np.inf, fit_intercept=False)
	#elif type == "bayesian ridge":
		#return linear_model.BayesianRidge(fit_intercept=False)
	#elif type == "ard":
		#return linear_model.ARDRegression(fit_intercept=False)
	elif type == "sgd":
		return linear_model.SGDRegressor(fit_intercept=False)

	# TODO look into multi-task Lasso, multi-task elastic net

def get_coefficients(regr, X, y):
	"""
	fit regression model regr to X and y
	return coefficients for regression
	"""
	regr.fit(X, y)

	return regr.coef_.flatten()

def load_data(mf_symbol):
	"""
	read in latest stock holdings for mf_symbol
	return np.array(num_shares_held), n_shares, np.array(navs), np.array(prices), [symbols], np.array(stock_assets)
	num_shares_held is the number of shares held for each ticker in symbols
	s_shares is
	symbols is list of stock tickers
	stock_assets is the total value of stock assets held by mf_symbol, placed into a np array
	num_shares_held[i] = number of shares of symbols[i] stock mf_symbol held last market day
	stock_assets = NAV*N_shares + liabilities, where NAV is assets - liabilities and N_shares 
	is mf_symbol shares outstanding
	"""
	# TODO load from db instead
	with open("num_shares_held.txt", "r") as file:
		num_shares_held = file.readlines()
		num_shares_held = [int(x) for x in num_shares_held]

	with open("n_shares.txt", "r") as file:
		n_shares = int(file.read())

	with open("navs.txt", "r") as file:
		navs = file.readlines()
		navs = [float(x) for x in navs]

	with open("prices.txt", "r") as file:
		prices = file.readlines()
		prices = [float(x) for x in prices]

	with open("symbols.txt", "r") as file:
		symbols = file.readlines()
		symbols = [s.replace("\n", "") for s in symbols]

	with open("stock_assets.txt", "r") as file:
		stock_assets = float(file.read())

	return np.array(num_shares_held), n_shares, np.array(navs), np.array(prices).reshape(1,-1), symbols, np.array(stock_assets).reshape(1,-1)

def predict(mf_symbol):
	"""
	run regressions with individual and ensemble models to predict mf_symbol's current holdings
	return [predictions]
	predictions is list of predictions for each model for each symbol, in order of types and with ensemble at end
	-1 indicates a sell, 0 is a hold, 1 is a buy
	"""
	num_shares_held, n_shares, navs, prices, symbols, stock_assets = load_data(mf_symbol)
	# base classifiers
	# theoretical results show the same number of base classifiers as class labels gives the highest accuracy (3 class labels)
	# TODO test different numbers of regressions for ensemble, fix last few regrs
	#types = ["linear", "ridge", "lasso", "elastic net", "lars", "lasso lars", "omp", \
		#"bayesian ridge", "ard", "sgd"]
	types = ["linear", "ridge", "lasso", "elastic net", "lars", "lasso lars", "sgd"]
	models = []
	results = []
	
	for type in types:
		model = get_model(type)
		models.append(model)
		results.append(get_coefficients(model, prices, stock_assets))
		
	predictions = []
	for result in results:
		prediction = []
		for i in range(len(result)):
			# if predicted coefficient (num_shares) is greater than original, buy
			if result[i] > num_shares_held[i]: prediction.append(1)
			# if predicted coefficient (num_shares) is less than original, sell
			elif result[i] < num_shares_held[i]: prediction.append(-1)
			# else hold
			else: prediction.append(0)

		predictions.append(prediction)

	# take base classifier votes and predict the mode
	ensemble_prediction = []
	for i in range(len(predictions[0])):
		buy_count = 0
		sell_count = 0
		hold_count = 0
		for prediction in predictions:
			if prediction[i] == 1: buy_count += 1
			elif prediction[i] == -1: sell_count += 1
			else: hold_count += 1

		# randomly break mode ties
		max_count = max([buy_count, sell_count, hold_count])
		max_classes = []
		if buy_count == max_count: max_classes.append(1)
		if sell_count == max_count: max_classes.append(-1)
		if hold_count == max_count: max_classes.append(0)
		ensemble_prediction.append(max_classes[rand.randint(0, len(max_classes)-1)])

	predictions.append(ensemble_prediction)

	return predictions

def main():
	predict("jensx")

if __name__=="__main__":
	main()
