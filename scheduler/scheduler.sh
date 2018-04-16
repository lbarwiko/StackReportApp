#!/bin/bash
# load stock data for the day
# check to see if markets were open today
result=$(curl -sL "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo" | grep -sc $(date +%F))

# if open today, scrape data
if [[ "$result" == "2" ]]
then
	python3 ~/StackReport/scrapers/stock_scraper.py daily >> ~/StackReport/logs/stock_scraper.log 2>&1
	python3 ~/StackReport/scrapers/mf_scraper.py daily >> ~/StackReport/logs/mf_scraper.log 2>&1
fi

# if open yesterday, run predictions and post to front end
result2=$(curl -sL "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo" | grep -sc $(date -d '1 day ago' +%F))
if [[ "$result2" == "1" ]]
then
	# python3 ~/StackReport/predictions/regression.py >> ~/StackReport/logs/regression.log 2>&1
	# use prev date since we don't get current day nav data right away
	prev_date=$(date -d '1 day ago' +%Y%m%d)
	python3 ~/StackReport/predictions/combinatorial.py $prev_date >> ~/StackReport/logs/combinatorial.log 2>&1
fi
