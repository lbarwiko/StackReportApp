import Levenshtein
import json
from urllib.request import urlopen
import os
from bs4 import BeautifulSoup
import re
import sys
import requests
import time
sys.path.append(sys.path[0]+"/../../")
from predictions_database.helper import *

def is_numeric(str_input):
    try:
        float(str_input)
        return True
    except ValueError:
        return False

def get_soup(url):
	"""
	Return a soup with using html.parser 
	Input: url
	"""
	page = urlopen(url)
	soup = BeautifulSoup(page, 'html.parser')
	return soup


def get_text_list(soup_list):
	text_list = []
	for s in soup_list:
		text_list.append(s.get_text().replace(u'\s+\xa0', u' '))
	return text_list


def get_sanitized_text_row(soup_list):
	"""
	Extract the text of a list of soup, and sanitize it
	Input: A list of soup (list of tags)
	Output: A list of sanitized text
	"""
	text_list = []
	for s in soup_list:
		text = s.get_text()
		# weird spaces
		text = re.sub('[\t\n\xa0]', ' ', text)
		# extra spaces
		text = re.sub(' +', ' ', text)
		# leading/tailing spaces
		text = text.strip()
		# special char in prices
		clean = re.sub('[$$\s;,]', '', text)
		# Using clean as condition to get rid of string of spaces
		# company names need spaces back, so don't return clean if it's a company
		if clean:
			if is_numeric(clean):
				text_list.append(clean)
			else:	
				text_list.append(text)
	return text_list


# def sanitize_company(company_name):
# 	output = company_name.replace("(a)", '')
# 	output = output.replace("(b)", '')
# 	output = output.replace(" class ", '')
# 	output = output.replace(" Class ", '')
# 	output = re.sub(r'[^\w\s]','',output)
# 	return output


def is_record(sanitized_td_text_list):
	"""
	Find out if a td-tagged entry is a record of stock + value + shares
	"""

	if len(sanitized_td_text_list) == 3:
		digit_count = 0
		for td_text in sanitized_td_text_list:
			if td_text.isdigit():
				digit_count  += 1
		if digit_count == 2:
			return True
		else:
			return False
	else:
		return False


def get_num_in_row(text_list):
	"""
	Loop through a list of string and get the first number in that list
	Useful for getting non-holdings rows such as total net assets and total investments)
	Input: a list of string
	Output: the first integer *OR -1 if there is no number in it*
	"""
	for text in text_list:
		if is_numeric(text):
			if text == int(float(text)):
				return int(text)
			else:
				return float(text)
	print("Warning: Cant get num in row, returning -1")

	return -1


def consist(text_list, substring):
	"""
	Check if a list of strings consists a substring
	Input: a list of strings, a substring
	Output: a boolean
	"""
	for text in text_list:
		if substring in text:
			return True

	return False


def print_report(report):
	"""
	Print out the report
	"""
	try:
		print("Symbol : %s" % str(report["symbol"]))
		print("Date : %s" % str(report["date"]))
		print("Total stock : %s" % str(report["total_stock"]))
		print("Total investment : %s" % str(report["total_investment"]))
		print("Num Shares : %s" % str(report["num_shares"]))
		print("Total Net Assets : %s" % str(report["total_net_assets"]))
		print("Stocks holding : ")
		for stock in report["stocks"]:
			print (stock["company"], stock["shares"], stock["value"])
	except KeyError:
		print("ERROR: Invalid report format")


def post_to_frontend(report):
	"""
	Send the report to the frontend
	Input: a dictionary (the report)
	Output: None
	"""

	m_symbol = report["symbol"].upper()

	# Destination
	url = "https://www.stackreport.io/api/f/%s" % m_symbol

	# Set up payload
	post_dict = {}
	post_dict["fund_id"] = str(m_symbol)
	post_dict["fund_name"] = str(get_mf_name(m_symbol))
	post_dict["holdings"] = []

	# Get payload data from report
	for each in report["stocks"]:
		temp = {}
		temp["security_id"] = str(get_ticker(each["company"]))
		temp["amount"] = int(each["value"])
		post_dict["holdings"].append(temp)

	data = json.dumps(post_dict)

	# Put request set up
	headers = {
	   'content-type': "application/json",
	   'cache-control': "no-cache"
	}

	response = requests.request("PUT", url, data=data, headers=headers)

	print(response.text)


def post_to_frontend_composite(report):
	"""
	"""
	siblings = get_children(report["symbol"])
	for sibling in siblings:
		report["symbol"] = sibling
		post_to_frontend(report)


# # TODO: DELETE AFTER REWRITING 
# def post_to_frontend(m_symbol, report):
# 	"""
# 	Send the report to the frontend
# 	Input: a dictionary (the report)
# 	Output: None
# 	"""

# 	m_symbol = m_symbol.upper()

# 	# DO SOMETHING
# 	url = "https://www.stackreport.io/api/f/%s" % m_symbol

# 	post_dict = {}
# 	post_dict["fund_id"] = str(m_symbol)
# 	post_dict["fund_name"] = str(get_mf_name(m_symbol))
# 	post_dict["holdings"] = []

# 	for each in report["stocks"]:
# 		temp = {}
# 		temp["security_id"] = str(get_ticker(each["company"]))
# 		temp["amount"] = int(each["value"])
# 		post_dict["holdings"].append(temp)

# 	data = json.dumps(post_dict)

# 	print (data)

# 	headers = {
# 	   'content-type': "application/json",
# 	   'cache-control': "no-cache"
# 	}

# 	response = requests.request("PUT", url, data=data, headers=headers)

# 	print(response.text)

def get_num_shares(m_symbol, total_net_assets, date=time.strftime("%Y%m%d")):


	nav = float(get_db_mf_nav(m_symbol, date))
	print (total_net_assets, nav)
	return float(total_net_assets) / nav
