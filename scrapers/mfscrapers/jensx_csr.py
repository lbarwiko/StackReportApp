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

# TODO FIX FLAG
if len(sys.argv) != 5:
		print("Invalid usage, must have 4 arguments.")
		print("Usage: <program> \"url of the jensx report\" date mf_symbol (p/np)")
		print("date must be an int(yyyy/mm/dd). E.g. Nov 30 2017 = 20171130")
		exit(1)

if not sys.argv[2].isdigit():
	print("date must be an int(yyyy/mm/dd). E.g. Nov 30 2017 = 20171130")
	exit(1)

# TODO FIX FLAG
if sys.argv[4] != 'p' and sys.argv[4] != 'np':
	print ("MUST state 'p' or 'np' (post or no-post)")
	exit(1)

def jensx_csr(url, date, m_symbol):

	# Initialize dicts and lists
	mutualFund = {"stocks": [], "other": []}
	temp = {}
	prev_temp_list = []
	temp_list = []

	soup = get_soup(url)

	tr_tags = soup.find_all("tr")

	done_with_stocks = False
	done_with_all = False
	started_scraping = False
	skip = False
	next_is_total_investments = False
	next_is_total_common_stocks = False

	for tr_tag in tr_tags:

		# Get <td>s in each <tr>
		td_tags = tr_tag.find_all("td")

		# Reset temp dict and temp_list
		temp = {}
		temp_list = []

		# finish scraping 
		if done_with_all:
			break

		# convert entry to list of text
		td_text = []

		for td_tag in td_tags:
			if re.sub('[$$;" ",\n\xa0]', '', td_tag.get_text()).isdigit():
				td_text.append(re.sub('[$$;\s,\t\\n\xa0]', '', td_tag.get_text()))
			else:
				td_text.append(re.sub('[$$;,\n\t\xa0]', '', td_tag.get_text()))

		# read through the entry
		# want to find if we can gather all 3 pieces: shares, stock name, and values
		# then push to master dict
		pieces = 0
		is_total_common_stocks = False
		is_total_investments = False
		is_total_net_assets = False

		if next_is_total_investments:
			next_is_total_investments = False
			is_total_investments = True

		if next_is_total_common_stocks:
			next_is_total_common_stocks = False
			is_total_common_stocks = True



		for text in td_text:
			if text:
				temp_list.append(text)
			if "Total" in text and  "Common" in text and  "Stocks" in text:
				next_is_total_common_stocks = True
			if "Total Investments" in text:
				next_is_total_investments = True
			if "TOTAL" in text and "NET" in text and "ASSETS" in text:
				is_total_net_assets = True

		# Figure out what to do with that tr entry
		if len(prev_temp_list) == 2 and len(temp_list) == 2 and prev_temp_list[0].isdigit() and temp_list[1].isdigit():
			# print ("===================== Special ==================")
			# print (prev_temp_list, temp_list)
			prev_temp_list[1] = prev_temp_list[1] + " " + temp_list[0]
			prev_temp_list.append(temp_list[1])
			temp_list = prev_temp_list
			# print (temp_list)

		if is_total_common_stocks:
			if "total_stock" not in mutualFund:
				# print ("===================== TOTAL STOCKS ====================")
				# print (temp_list)
				mutualFund["total_stock"] = int(temp_list[1])
				done_with_stocks = True

		elif is_total_investments:
			mutualFund["total_investment"] = int(temp_list[1])

		elif is_total_net_assets and started_scraping:
			# print("============= TOTAL NET ASSETS ==============")
			# print (temp_list)
			done_with_all = True
			mutualFund["total_net_assets"] = int(temp_list[1])

		elif len(temp_list) == 3 and temp_list[0].isdigit() and not temp_list[1].isdigit() and temp_list[2].isdigit():
			started_scraping = True
			temp["shares"] = int(temp_list[0])
			temp["company"] = str(temp_list[1])
			temp["value"] = int(temp_list[2])

			if not done_with_stocks:
				mutualFund["stocks"].append(temp)
			else:
				mutualFund["other"].append(temp)

		prev_temp_list = temp_list

	nav = get_db_mf_nav(m_symbol, date)

	num_shares = float(mutualFund["total_net_assets"]) / float(nav)
	mutualFund["num_shares"] = num_shares

	return mutualFund

def main():
	date = sys.argv[2]
	url = sys.argv[1]
	m_symbol = sys.argv[3].upper()
	post = False
	if sys.argv[4] == 'p':
		post = True

	report = jensx_csr(url, date, m_symbol)
	add_mf_report(m_symbol, report, date)

	# TODO FIX FLAG
	if post:
		post_to_frontend(m_symbol, report)
	# m_symbol, m_date, total_investment, total_net_assets, shares

if __name__ == '__main__':
	main()
		

# print ("total_net_assets", mutualFund["total_net_assets"])
# print ("total_stock", mutualFund["total_stock"])
# print ("total_investment", mutualFund["total_investment"])

# print ("============= COMMON STOCKS ===================")

# sum = 0
# for fund in mutualFund["stocks"]:
# 	sum += fund["value"]
# 	print (fund)

# print ("============= OTHER INVESTMENTS ==================")

# for investment in mutualFund["other"]:
# 	print (investment)

# print ("Sum of values : %d" % sum)
# print ("Number of companys : %d" % len(mutualFund["stocks"]))

# # Error checking
# assert(sum == mutualFund["total_stock"])

# with open('data/jensx_%s.txt' % str(date), 'w') as outfile:
#     json.dump(mutualFund, outfile)
