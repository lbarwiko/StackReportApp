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

urll = "https://www.sec.gov/Archives/edgar/data/844779/000119312517192557/d323069dncsrs.htm"

def bmcax_csr(url, m_symbol):

	soup = get_soup(url)
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



	return report


def main():

	if args.nq is None and args.csr is None:
		parser.error("Please specify -nq or -csr")
		exit(1)

	url = args.url[0]
	symbol = args.symbol[0]
	report = bmcax_csr(url, symbol)

	print_report(report)


	# add_mf_report(report)
	# add_mf_other(report)

	if args.post:
		post_to_frontend(report)

if __name__ == '__main__':
	main()




	










