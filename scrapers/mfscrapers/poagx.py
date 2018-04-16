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


def poagx_nq(url, symbol):
	soup = get_soup(url)
	report = {}
	report["symbol"] = symbol

	# Get Date
	date_string = soup.find(text=re.compile("Date of reporting")).next_sibling.text
	date = time.strptime(date_string, "%B %d, %Y")
	date = time.strftime("%Y%m%d", date)
	report["date"] = date


	tr_tags = soup.find_all("tr")
	idx = 0


	# Look for holdings
	report["stocks"] = []
	for tr_tag in tr_tags[idx:]:
		td_tags = tr_tag.find_all("td")
		text_row = get_sanitized_text_row(td_tags)

		if consist(text_row, "TOTAL COMMON STOCKS"):
			print(text_row)
			report["total_stock"] = int(get_num_in_next_row(tr_tag))
			break

		elif is_record(text_row):
			print(text_row)
			temp = {}
			temp["company"] = str(text_row[1])
			temp["shares"] = int(text_row[0])
			temp["value"] = int(text_row[2])
			report["stocks"].append(temp)

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

		if consist(text_row, "TOTAL INVESTMENTS"):
			report["total_investment"] = int(get_num_in_next_row(tr_tag))

		elif consist(text_row, "TOTAL NET ASSETS"):
			report["total_net_assets"] = int(get_num_in_row(text_row))
			break

	nav = 23.23
	report["num_shares"] = int(report["total_net_assets"]/nav)

	print_report(report)
	
	return report


def poagx_csr(url, symbol):

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
		print("TO BE IMPLEMENTED")
		return
		report = poagx_csr(url, symbol)
	else:
		report = poagx_nq(url, symbol)

	add_mf_report(report)
	add_mf_other(report)

	if args.post:
		if len(symbol) >= 6:
			post_to_frontend_composite(report)
		else:
			post_to_frontend(report)



	return

if __name__ == '__main__':
	main()

# =============================================

# print("=====-TESTING AREA-=====")
# url = args.url[0]
# symbol = args.symbol[0]


# soup = get_soup(url)

# report = {}
# report["symbol"] = symbol
# date_string = soup.find(text=re.compile("Date of reporting")).next_sibling.text
# date = time.strptime(date_string, "%B %d, %Y")
# date = time.strftime("%Y%m%d", date)
# report["date"] = date

