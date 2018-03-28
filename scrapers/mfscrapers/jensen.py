import json
from bs4 import BeautifulSoup
import re
import sys
from helper import *
import time
sys.path.append(sys.path[0]+"/../../")
from predictions_database.helper import add_mf_report, get_db_mf_nav, add_mf_other

def jensen_csr(url, symbol):
	return 

url = "https://www.sec.gov/Archives/edgar/data/887215/000120677417002304/jensenqgf3275451-ncsr.htm"
soup = get_soup(url)

p_tags = soup.find_all("p")

# GET DATE
for p_tag in p_tags:
	if "Date of reporting period" in p_tag.get_text():
		date = re.sub('[\t\n\s,\xa0]','',p_tag.get_text())
		date = date.split(":")[1]
		date = time.strptime(date, "%B%d%Y")
		date = time.strftime("%Y%m%d", date)
		print (date)

# Look for Shares, Net Assets, and NAV of each class
tr_tags = soup.find_all("tr")
idx = 0

for tr_tag in tr_tags[idx:]:
	td_tags = tr_tag.find_all("td")
	td_text_list = get_text_list(td_tags)

	idx += 1
	if consist(td_text_list, "Net Assets Consist of"):
		break

for tr_tag in tr_tags[idx:]:
	td_tags = tr_tag.find_all("td")
	text_row = get_sanitized_text_row(td_tags)
	print (text_row)
	if consist(text_row, "Net Assets"):
		print (text_row)
	if consist(text_row, "Shares outstanding"):
		print (text_row)
	if consist(text_row, "Net Assets Value"):
		print (text_row)
