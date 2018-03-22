"""
module for submitting post requests of results to the restAPI
"""

import json
import requests

def load_data():
	"""
	return dictionary mapping mf_symbols to their predicted data
	"""

	#TODO load mf symbols list and prediction data from db
	mf_symbols_to_data = {}
	for mf_symbol in mf_symbols:
		with open("~/StackReport/predictions/" + mf_symbol + "_regr.json") as file:
			data = json.load(file)
			mf_symbols_to_data[mf_symbol] = data

	return mf_symbols_to_data

def post_request(mf_symbol, data):
	"""
	send prediction results for mf_symbol to server
	"""

	url = "localhost:8000/api/p/"
	r = requests.post(url, data)

def main():
	mf_symbols_to_data = load_data()

	for mf_symbol in mf_symbols_to_data.keys():
		post_request(mf_symbol, mf_symbols_to_data[mf_symbol])

if __name__=="__main__":
	main()
