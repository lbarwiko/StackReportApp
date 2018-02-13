"""
Scrap the holdings from the CSR report of jensx
Input: url of the report
Output: a txt with a json object contains the list of holdings named jensx_<date>
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

quote_page = sys.argv[1]
date = sys.argv[2]

mutualFund = {"funds": []}
temp = {}
page = urllib2.urlopen(quote_page)
soup = BeautifulSoup(page, 'html.parser')

tr_tags = soup.find("b", text="Schedule of Investments").findNext("table").find_all("tr")

for tr_tag in tr_tags:
	td_tags = tr_tag.find_all("td")

	if len(td_tags) == 3:
		td_tags[0] = re.sub('[$,]', '', td_tags[0].get_text())
		td_tags[1] = td_tags[1].get_text()
		td_tags[2] = re.sub('[$,]', '', td_tags[2].get_text())

		if td_tags[0].isdigit() and td_tags[2].isdigit():
			temp = {}
			temp["shares"] = int(td_tags[0])
			temp["company"] = td_tags[1]
			temp["value"] = int(td_tags[2])
			mutualFund["funds"].append(temp)

sum = 0
for fund in mutualFund["funds"]:
	sum += fund["value"]
	print (fund)


print ("Sum of values : %d" % sum)
print ("Number of companys : %d" % len(mutualFund["funds"]))

with open('jensx_%s.txt' % str(date), 'w') as outfile:
    json.dump(mutualFund, outfile)
