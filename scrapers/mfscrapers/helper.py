import Levenshtein
import json
from urllib.request import urlopen
import json
from bs4 import BeautifulSoup
import re
import sys

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