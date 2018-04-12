import json
from bs4 import BeautifulSoup
import re
import sys
from helper import *
import time
sys.path.append(sys.path[0]+"/../../")
from predictions_database.helper import *

import argparse
parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('-nq', action='store_true', help="Scrape from a N-Q report")
parser.add_argument('-csr', action='store_true', help="Scrape from a N-(N)CSR report")
parser.add_argument('-p', '--post', action='store_true', help="Posting the data to the frontend")
parser.add_argument('-u', '--url', nargs=1, required=True, help='Enter the url of the report')
parser.add_argument('-s', '--symbol', nargs=1, required=True, help='Enter symbol of the mutual fund')
args = parser.parse_args()

def jensen_csr(url, symbol):
	soup = get_soup(url)
	report = {}
	report["symbol"] = symbol

	# Get Date
	date_string = soup.find(text=re.compile("Date of reporting")).parent.next_sibling.text
	date = time.strptime(date_string, "%B %d, %Y")
	date = time.strftime("%Y%m%d", date)
	report["date"] = date


	tr_tags = soup.find_all("tr")
	idx = 0

	# SPECIAL CASE FOR JENSGF
	# It has children funds
	if symbol.upper() == "JENSGF":
		# Look for Shares, Net Assets, and NAV of the overall fund
		for tr_tag in tr_tags[idx:]:
			td_tags = tr_tag.find_all("td")
			td_text_list = get_text_list(td_tags)

			idx += 1
			if consist(td_text_list, "Net Assets Consist of"):
				break

		class_net_assets = []
		class_shares = []
		class_nav = []
		class_name = []
		for tr_tag in tr_tags[idx:]:
			td_tags = tr_tag.find_all("td")
			text_row = get_sanitized_text_row(td_tags)

			if len(text_row) > 0 and text_row[0] == "Net Assets":
				class_net_assets.append(get_num_in_row(text_row))
				# Get which class is that
				class_name.append(tr_tag.find_previous_sibling("tr").text.strip())

			elif consist(text_row, "Shares outstanding"):
				class_shares.append(get_num_in_row(text_row))
			elif consist(text_row, "Net Asset Value"):
				class_nav.append(get_num_in_row(text_row))
			elif is_record(text_row):
				# Don't incremnt idx
				break
			idx += 1

	# Look for holdings
	report["stocks"] = []
	for tr_tag in tr_tags[idx:]:
		td_tags = tr_tag.find_all("td")
		text_row = get_sanitized_text_row(td_tags)

		if is_record(text_row):
			temp = {}
			temp["company"] = str(text_row[1])
			temp["shares"] = int(text_row[0])
			temp["value"] = int(text_row[2])
			report["stocks"].append(temp)

		elif consist(text_row, "Total Common Stocks"):
			next_row = tr_tag.find_next("tr").find_all("td")
			next_row = get_sanitized_text_row(next_row)
			report["total_stock"] = int(get_num_in_row(next_row))
			break

		# The tricky case when a stock is splited into 2 rows
		elif len(text_row) == 2 and text_row[0].isdigit():
			next_row = tr_tag.find_next("tr").find_all("td")
			next_row = get_sanitized_text_row(next_row)
			holdings = [text_row[0], str(text_row[1]) + " " + str(next_row[0]), next_row[1]]
			if is_record(holdings):
				temp = {}
				temp["company"] = str(holdings[1])
				temp["shares"] = int(holdings[0])
				temp["value"] = int(holdings[2])
				report["stocks"].append(temp)
			else:
				print("Error: splitted holding not scraped properly")

		idx += 1

	# Look for rest
	for tr_tag in tr_tags[idx:]:
		td_tags = tr_tag.find_all("td")
		text_row = get_sanitized_text_row(td_tags)
		if consist(text_row, "Total Investments"):
			next_row = tr_tag.find_next("tr").find_all("td")
			next_row = get_sanitized_text_row(next_row)
			report["total_investment"] = int(get_num_in_row(next_row))

		elif consist(text_row, "TOTAL NET ASSETS"):
			report["total_net_assets"] = int(get_num_in_row(text_row))
			break

	nav = 0
	if symbol == "JENSGF":
		class_dict = ({"Class J Shares": "JENSX", "Class R Shares" : "JENRX",
			"Class I Shares" : "JENIX", "Class Y Shares" : "JENYX"})
		for i in range(0, len(class_name)):
			symbol = class_dict[class_name[i]]
			ratio = float(class_net_assets[i])/float(report["total_net_assets"])
			nav += ratio * class_nav[i]
			add_children_fund("JENSGF", symbol, ratio)

	else:
		nav = get_db_mf_nav(symbol)
	report["num_shares"] = int(report["total_net_assets"]/nav)
	
	return report


def jensen_nq(url, symbol):

	soup = get_soup(url)
	# Get soup
	soup = get_soup(url)

	report = {}
	report["symbol"] = symbol

	# Get Date
	date_string = soup.find(text=re.compile("Date of reporting")).next_sibling.text
	date = time.strptime(date_string, "%B %d, %Y")
	date = time.strftime("%Y%m%d", date)
	report["date"] = date



def main():
	print(args.nq, args.csr)
	if not args.nq and not args.csr:
		parser.error("Please specify -nq or -csr")
		exit(1)
	symbol = args.symbol[0]
	url = args.url[0]

	report = {}
	if args.csr:
		report = jensen_csr(url, symbol)
	else:
		print("TO BE IMPLEMENTED")
		return

	add_mf_report(report)
	add_mf_other(report)
	if args.post:
		post_to_frontend(report)


	return

if __name__ == '__main__':
	main()

# =============================================

print("=====-TESTING AREA-=====")
url = args.url[0]
symbol = args.symbol[0]


soup = get_soup(url)

report = {}
report["symbol"] = symbol
date_string = soup.find(text=re.compile("Date of reporting")).next_sibling.text
date = time.strptime(date_string, "%B %d, %Y")
date = time.strftime("%Y%m%d", date)
report["date"] = date

