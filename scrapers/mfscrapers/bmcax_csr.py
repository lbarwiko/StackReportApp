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
parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('-p', '--post', action='store_true', help="Posting the data to the frontend")
parser.add_argument('-u', '--url', nargs=1, required=True, help='Enter the url of the report')
parser.add_argument('-s', '--symbol', nargs=1, required=True, help='Enter symbol of the mutual fund')
args = parser.parse_args()


urll = "https://www.sec.gov/Archives/edgar/data/844779/000119312517192557/d323069dncsrs.htm"

def bmcax_csr(url, m_symbol):
	print ("Getting soup... ")
	soup = get_soup(url)

	print ("Finding tr tags...")
	tr_tags = soup.find_all("tr")

	print("Begin scraping...")

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
			report["total_stock"] = get_num_in_row(td_text_row)
			print (tr_tags[idx].get_text())

			idx += 1
			break

		idx += 1

	# Find the rest
	for tr_tag in tr_tags[idx:]:
		td_tags = tr_tag.find_all("td")
		td_text_row = get_sanitized_text_row(td_tags)
		
		if consist(td_text_row, "Total Investments"):
			report["total_investment"] = get_num_in_row(td_text_row)

		elif consist(td_text_row, "Net Assets"):
			report["total_net_assets"] = get_num_in_row(td_text_row)
			break

	report["num_shares"] = 45
	#report["num_shares"] = get_num_shares(m_symbol, report["total_net_assets"], report["date"])

	print_report(report)

	return report


def main():
	url = args.url[0]
	print (url)
	symbol = args.symbol[0]
	print (symbol)
	report = bmcax_csr(url, symbol)
	add_mf_report(report)

	if args.post:
		print ("UPLOAD")

if __name__ == '__main__':
	main()




	










