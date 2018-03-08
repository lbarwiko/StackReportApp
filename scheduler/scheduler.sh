#!/bin/bash
# load stock data for the day
# check to see if markets were open today
result=$(curl -sL "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo" | grep -sc $(date +%F))

# if open, scrape data and run predictions. otherwise do nothing
if [[ "$result" == "2" ]]
then
	python ../scrapers/stock_scraper.py daily
	python ../scrapers/mf_scraper.py daily
	python ../predictions/regression.py
fi
