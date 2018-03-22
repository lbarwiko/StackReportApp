"""
module for submitting post requests of results to the restAPI
"""

import os
import sys
import json
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import get_mf_list

def load_data():
	"""
	return dictionary mapping mf_symbols to their predicted data
	"""
	# load mf_symbols from db
	mf_symbols = get_mf_list()
	mf_symbols_to_data = {}

	for mf_symbol in mf_symbols:
		with open("/root/StackReport/predictions/" + mf_symbol + "_regr.json") as file:
			data = json.dumps(json.load(file))
			mf_symbols_to_data[mf_symbol] = data

	return mf_symbols_to_data

def post_request(mf_symbol, data):
	"""
	send prediction results for mf_symbol to server
	"""
	url = "http://www.stackreport.io:80/api/p/"
	response = os.popen("curl --request POST --url " + url + " --header 'Content-Type: application/json' --data '" + data + "'").read()

	return response
	
def main():
	mf_symbols_to_data = load_data()

	for mf_symbol in mf_symbols_to_data.keys():
		post_request(mf_symbol, mf_symbols_to_data[mf_symbol])

if __name__=="__main__":
	main()
