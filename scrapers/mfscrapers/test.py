import argparse
parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('-p', '--post', action='store_true', help="Posting the data to the frontend")
parser.add_argument('-u', '--url', nargs=1, required=True, help='Enter the url of the report')
parser.add_argument('-s', '--symbol', nargs=1, required=True, help='Enter symbol of the mutual fund')
args = parser.parse_args()

print(args.p)
