"""
module for submitting post requests of results to the restAPI
"""

import os
import sys
import json
import copy
import datetime as dt
sys.path.append(sys.path[0]+"/../")
from predictions_database.helper import get_mf_list, get_children

def load_data(date):
	"""
	return dictionary mapping mf_symbols to their predicted data
	"""
	# load mf_symbols from db
	files = os.listdir("/root/StackReport/predictions/Output/")
	mf_symbols = [file.replace("_comb.json", '') for file in files if file.endswith("_comb.json")]
	mf_symbols_to_data = {}

	for mf_symbol in mf_symbols:
		with open("/root/StackReport/predictions/Output/" + mf_symbol + "_comb.json") as file:
			data = json.load(file)
			data["date"] = '"' + date + '"'
			mf_symbols_to_data[mf_symbol] = data

	return mf_symbols_to_data

def post_request(datum):
	"""
	send prediction results for mf_symbol to server
	"""
	# handle funds that are a composite of multiple tickers
	data = []
	for child_symbol in get_children(datum["fund_id"]):
		child_data = copy.deepcopy(datum)
		child_data["fund_id"] = child_symbol
		data.append(child_data)

	if len(data) == 0: data.append(datum)

	for d in data:
		url = "https://www.stackreport.io/api/p/"
		response = os.popen("curl -s --request POST --url " + url + " --header 'Content-Type: application/json' --data '" \
			+ json.dumps(d) + "'").read()

	#TODO check if response good, if not then print error for logs
	return response
	
def main():
	mf_symbols_to_data = load_data(sys.argv[1])

	for mf_symbol in mf_symbols_to_data.keys():
		post_request(mf_symbols_to_data[mf_symbol])

if __name__=="__main__":
	main()
