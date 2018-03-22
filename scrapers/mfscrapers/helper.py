import Levenshtein
import json
from urllib.request import urlopen
import os
from bs4 import BeautifulSoup
import re
import sys
import requests
sys.path.append(sys.path[0]+"/../../")
from predictions_database.helper import get_mf_name, get_ticker

def get_soup(url):
	page = urlopen(url)
	soup = BeautifulSoup(page, 'html.parser')
	return soup

def get_text_list(soup_list):
	text_list = []
	for s in soup_list:
		text_list.append(s.get_text().replace(u'\xa0', u' '))
	return text_list

def sanitize_company(company_name):
	output = company_name.replace("(a)", '')
	output = output.replace("(b)", '')
	output = output.replace(" class ", '')
	output = output.replace(" Class ", '')
	output = re.sub(r'[^\w\s]','',output)
	return output

def post_to_frontend(m_symbol, report):

	m_symbol = m_symbol.upper()

	# DO SOMETHING
	url = "https://www.stackreport.io/api/f/%s" % m_symbol

	post_dict = {}
	post_dict["fund_id"] = str(m_symbol)
	post_dict["fund_name"] = str(get_mf_name(m_symbol))
	post_dict["holdings"] = []

	for each in report["stocks"]:
		temp = {}
		temp["security_id"] = str(get_ticker(each["company"]))
		temp["amount"] = int(each["value"])
		post_dict["holdings"].append(temp)

	data = json.dumps(post_dict)

<<<<<<< HEAD
	print (data)
	# print (post_dict)
	headers = {
	   'content-type': "application/json",
	   'cache-control': "no-cache"
	}

	response = requests.request("PUT", url, data=data, headers=headers)

	print(response.text)
	
=======
	url = "https://www.stackreport.io/api/f/"
	response = os.popen("curl -s --request POST --url " + url + " --header 'Content-Type: application/json' --data '" + data + "'").read()

	return post_dict
	
>>>>>>> 3aa647192bfbf192cfb165d61a4da6c71c6fff4e
