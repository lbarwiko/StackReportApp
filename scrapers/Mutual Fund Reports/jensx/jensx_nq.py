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

if len(sys.argv) != 3:
		print("Invalid usage, must have two arguments.")
		print("Usage: <program> \"url of the jensx report\" date")
		print("date must be an int(yyyy/mm/dd). E.g. Nov 30 2017 = 20171130")
		exit(1)

if not sys.argv[2].isdigit():
	print("date must be an int(yyyy/mm/dd). E.g. Nov 30 2017 = 20171130")
	exit(1)

quote_page = sys.argv[1]
date = sys.argv[2]

mutualFund = {"funds": []}
temp = {}
page = urllib2.urlopen(quote_page)
soup = BeautifulSoup(page, 'html.parser')

tr_tags = soup.find_all("tr")

for tr_tag in tr_tags:
	stop = False
	td_tags = tr_tag.find_all("td")

	# All holding entries have 8 td tags
	if len(td_tags) == 8:

		td_text_list = []
		idx = 0
		for td_tag in td_tags:
			td_tag = re.sub('[$,\n\xa0]', '', td_tag.get_text())

			# Finding "Total Common Stocks" means the holding report ends
			if "Total Common Stocks" in td_tag: 
				stop = True
				break 

			td_text_list.append(td_tag)

		if stop:
			break

		if td_text_list[1].isdigit() and td_text_list[6].isdigit():
			temp = {}
			temp["shares"] = int(td_text_list[1])
			temp["company"] = td_text_list[3]
			temp["value"] = int(td_text_list[6])
			mutualFund["funds"].append(temp)
			print (temp)

sum = 0
for fund in mutualFund["funds"]:
	sum += fund["value"]
	print (fund)


print ("Sum of values : %d" % sum)
print ("Number of companys : %d" % len(mutualFund["funds"]))

with open('jensx_%s.txt' % str(date), 'w') as outfile:
    json.dump(mutualFund, outfile)
