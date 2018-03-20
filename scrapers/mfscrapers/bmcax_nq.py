"""
Scrap the holdings from the CSR report of jensx
Input: url of the report
Output: a txt with a json object contains the list of holdings named jensx_<date>.txt
"""

import urllib2
import json
from bs4 import BeautifulSoup
import re
import sys
from helper import *

soup = get_soup("https://www.sec.gov/Archives/edgar/data/844779/000119312517361642/d464769dncsr.htm")
tr_tags = soup.find_all("tr")

idx = 0

# search thru tr_tags
for tr_tag in tr_tags:

	# Find the begining of the table,
	# which is a tr tag contains "Schedule of investments" and the fund name

	# a tr tag contains many td tags
	td_tags = tr_tag.find_all("td")
	td_text_list = get_text_list(td_tags)
	is_schdule = False
	is_fund = False

	for td_text in td_text_list:
		if "Schedule of Investments" in td_text:
			is_schdule = True
		elif "BlackRock Mid-Cap Growth Equity Portfolio" in td_text:
			is_fund = True

	idx += 1

	if is_schdule and is_fund:
		print td_text_list
		break

time = 0 
for tr_tag in tr_tags[idx:]:
	td_tags = tr_tag.find_all("td")
	td_text_list = get_text_list(td_tags)







