import json 
import pickle
import sys



def write_list_to_file(filename, lst):
	with open(filename, 'w') as outF:
		for each in lst:
			outF.write(str(each)+'\n')
	outF.close()

def load_json(filename):
	"""
	reads in a json object from a text file and return data in lists
	input: file name
	output: three lists: the lists of companies, shares, and values
	"""
	file = open(filename)
	data = json.load(file)

	company = []
	shares = []
	value = []

	for fund in data['funds']:
		print (fund)
		company.append(fund['company'])
		shares.append(fund['shares'])
		value.append(fund['value'])

	file.close()

	write_list_to_file(filename[:-4]+"_company_list.txt", company)
	write_list_to_file(filename[:-4]+"_shares_list.txt", shares)


if len(sys.argv) != 2:
		print("Invalid usage, must have 1 arguments ( filename )")
		exit(1)

filename = sys.argv[1]
load_json(filename)
