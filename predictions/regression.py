"""
module to run linear regressions to predict mutual fund movements
"""

from sklearn import linear_model
from sklearn.model_selection import cross_val_predict

def get_model(type):
	"""
	return the appropriate regression model according to type
	"""
	if type == "linear":
		return linear_model.LinearRegression(fit_intercept=False, copy_X=False)
	elif type == "ridge":
		return linear_model.Ridge(fit_intercept=False, copy_X=False)
	elif type == "lasso":
		return linear_model.Lasso(fit_intercept=False, copy_X=False)
	# multi-task Lasso

def get_coefficients(regr, X, y):
	"""
	fit regression model regr to X and y
	return coefficients for regression
	"""
	regr.fit(X, y)

	return regr.coef_
