Make sure that you have the following packages to use anything in helper.py:
    python-Levenshtein
    bs4
    psycopg2
    fuzzywuzzy


Here is an example of the report format:
{
	"symbol" : "ABCD",
	"date" : 20171230,
	"stocks" : [
			{
				"company": "Apple, Inc.",
				"shares" : 99999999,
				"value" : 1234567890
			}, ...
	],
	"total_stock" : 999123123123,
	"total_investment" : 62723471741,
	"num_shares" : 11414243242,         # total_net_assets / nav
	"total_net_assets" : 6235235723757,
	"others" : [					    # don't need it for now
			{
				"company": "Apple, Inc.",
				"shares" : 99999999,
				"value" : 1234567890
			}, ...
	]
}
