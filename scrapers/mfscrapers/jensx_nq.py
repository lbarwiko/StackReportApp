"""
Scrap the holdings from the CSR report of jensx
Input: url of the report
Output: a txt with a json object contains the list of holdings named jensx_<date>.txt
"""

import json
from bs4 import BeautifulSoup
import re
import sys
from helper import *
sys.path.append(sys.path[0]+"/../../")
from predictions_database.helper import add_mf_report, get_db_mf_nav, add_mf_other

if len(sys.argv) != 4:
		print("Invalid usage, must have two arguments.")
		print("Usage: <program> \"url of the jensen report\" date mf_symbol")
		print("date must be an int(yyyy/mm/dd). E.g. Nov 30 2017 = 20171130")
		exit(1)

if not sys.argv[2].isdigit():
	print("date must be an int(yyyy/mm/dd). E.g. Nov 30 2017 = 20171130")
	exit(1)

def jensx_nq(url, date, m_symbol):

	mutualFund = {"stocks": [], "other": []}
	temp = {}
	soup = get_soup(url)

	tr_tags = soup.find_all("tr")

	done_with_stocks = False
	done_with_all = False
	start_scraping = False
	for tr_tag in tr_tags:

		td_tags = tr_tag.find_all("td")

		# finish scraping 
		if done_with_all:
			break

		# convert entry to list of text
		td_text = []

		for td_tag in td_tags:
			if re.sub('[$$;" ",\n\xa0]', '', td_tag.get_text()).isdigit():
				td_text.append(re.sub('[$$;" ",\n\xa0]', '', td_tag.get_text()))
			else:
				td_text.append(re.sub('[$$;,\n\xa0]', '', td_tag.get_text()))

		# read through the entry
		# want to find if we can gather all 3 pieces: shares, stock name, and values
		# then push to master dict
		pieces = 0
		is_total_common_stocks = False
		is_total_investments = False
		is_total_net_assets = False
		temp = {}
		temp_list = []

		for text in td_text:
			if text:
				temp_list.append(text)
			if "Total Common Stocks" in text:
				is_total_common_stocks = True
			if "Total Investments" in text:
				is_total_investments = True
			if "TOTAL NET ASSETS" in text:
				is_total_net_assets = True

		# Figure out what to do with that tr entry
		if is_total_common_stocks:
			mutualFund["total_stock"] = int(temp_list[1])
			done_with_stocks = True

		elif is_total_investments:
			mutualFund["total_investment"] = int(temp_list[1])

		elif is_total_net_assets and start_scraping:
			done_with_all = True
			mutualFund["total_net_assets"] = int(temp_list[1])

		elif len(temp_list) == 3 and temp_list[0].isdigit() and not temp_list[1].isdigit() and temp_list[2].isdigit():
			start_scraping = True
			temp["shares"] = int(temp_list[0])
			temp["company"] = str(temp_list[1])
			temp["value"] = int(temp_list[2])

			if not done_with_stocks: 
				mutualFund["stocks"].append(temp)
			else:
				mutualFund["other"].append(temp)

	nav = get_db_mf_nav(m_symbol, date)

	num_shares = float(mutualFund["total_net_assets"]) / float(nav)
	mutualFund["num_shares"] = num_shares

	return mutualFund


def main():
	url = sys.argv[1]
	date = sys.argv[2]
	m_symbol = sys.argv[3].upper()
	dict = jensx_nq(url, date, m_symbol)
	add_mf_report(m_symbol, dict, date)

if __name__ == '__main__':
	main()

# sum = 0
# for fund in mutualFund["stocks"]:
# 	sum += fund["value"]
# 	print (fund)


# print ("Sum of values : %d" % sum)
# print ("Number of companys : %d" % len(mutualFund["stocks"]))

# with open('data/jensx_%s.txt' % str(date), 'w') as outfile:
#     json.dump(mutualFund, outfile)
