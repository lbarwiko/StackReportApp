"""
Scrap the holdings from the CSR report of jensx
Input: url of the report
Output: a txt with a json object contains the list of holdings named jensx_<date>.txt
"""
import json
from bs4 import BeautifulSoup
import re
import sys
import time
from helper import *
sys.path.append(sys.path[0]+"/../../")
from predictions_database.helper import *

import argparse
parser = argparse.ArgumentParser(description='Jensen funds scraper')
parser.add_argument('-nq', action='store_true', help="Scrape from a N-Q report")
parser.add_argument('-csr', action='store_true', help="Scrape from a N-(N)CSR report")
parser.add_argument('-p', '--post', action='store_true', help="Posting the data to the frontend")
parser.add_argument('-u', '--url', nargs=1, required=True, help='Enter the url of the report')
parser.add_argument('-s', '--symbol', nargs=1, required=True, help='Enter symbol of the mutual fund')
args = parser.parse_args()


def cmgix_csr(url, m_symbol):

	# Get the Soup
	soup = get_soup(url)
	print("Got Soup")
	# Find all tr tags
	tr_tags = soup.find_all("tr")

	report = {}
	report["symbol"] = m_symbol
	report["stocks"] = []

	idx = 0

	p_tags = soup.find_all("p")

	# GET DATE
	for p_tag in p_tags:
		if "Date of reporting period" in p_tag.get_text():
			date = re.sub('[/\t\n\s,\xa0]','',p_tag.get_text())
			date = date.split(":")[1]
			date = time.strptime(date, "%m%d%Y")
			date = time.strftime("%Y%m%d", date)
			print (date)
			report["date"] = date

	# search thru tr_tags
	# Find the begining of the holding report of the fund we want
	for tr_tag in tr_tags:

		# Find the begining of the table,
		# which is a tr tag contains "Schedule of investments" and the fund name
		# a tr tag contains many td tags
		td_tags = tr_tag.find_all("td")
		td_text_row = get_sanitized_text_row(td_tags)

		if (consist(td_text_row, "Schedule of Investments") and 
			consist(td_text_row, "BlackRock Mid-Cap Growth Equity Portfolio")):
			idx += 1
			break

		idx += 1


	# Find stocks
	is_total_common_stock = False
	for tr_tag in tr_tags[idx:]:
		td_tags = tr_tag.find_all("td")
		td_text_row = get_sanitized_text_row(td_tags)


		if is_record(td_text_row):
			temp = {}
			temp["company"] = str(td_text_row[0])
			temp["shares"] = int(td_text_row[1])
			temp["value"] = int(td_text_row[2])

			report["stocks"].append(temp)

		elif consist(td_text_row, "Total Common Stocks"):
			report["total_stock"] = int(get_num_in_row(td_text_row))
			break

		idx += 1

	# Find the rest
	for tr_tag in tr_tags[idx:]:
		td_tags = tr_tag.find_all("td")
		td_text_row = get_sanitized_text_row(td_tags)

		if consist(td_text_row, "Schedule of Investments"):
			# Do nothing
			continue

		elif consist(td_text_row, "Total Investments"):
			report["total_investment"] = int(get_num_in_row(td_text_row))

		elif consist(td_text_row, "Net Assets"):
			report["total_net_assets"] = int(get_num_in_row(td_text_row))
			break

	report["num_shares"] = int(get_num_shares(m_symbol, report["total_net_assets"], report["date"]))

	print_report(report)

	return report


def cmgix_nq(url, symbol):
	return 0 

def main():

	# Actually it doesn't matter
	if args.nq is None and args.csr is None:
		parser.error("Please specify -nq or -csr")
		exit(1)

	# Read arguments
	url = args.url[0]
	symbol = args.symbol[0].upper()

	# Scrape Report
	if args.csr:
		report = cmgix_csr(url, symbol)
	else:
		print("TO BE IMPLEMENTED GOOBYE")
		return 
		
		report = cmgix_nq(url, symbol)

	# Upload to Database
	add_mf_report(report)
	add_mf_other(report)

	# Upload to frontend if specified
	if args.post:
		post_to_frontend(report)

if __name__ == '__main__':
	main()




	










