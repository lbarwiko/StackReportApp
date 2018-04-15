import re
from bs4 import Comment
import time
import pprint
from helper import get_soup


NB_QR_URL = "https://www.sec.gov/Archives/edgar/data/44402/000089843218000111/nq.htm"
NB_CSR_URL = "https://www.sec.gov/Archives/edgar/data/44402/000089843217001017/n-csr.htm"


def nb_qr(soup, m_symbol, m_name):
    report = {}
    report["symbol"] = m_symbol
    report["stocks"] = []

    # GET DATE
    pattern = re.compile(r"Date of reporting period")
    tag = soup.find("div", text=pattern)
    date = re.sub('[/\t\n\s,\xa0]','',tag.get_text())
    date = date.split(":")[1]
    # %B -> month by full name
    date = time.strptime(date, "%B%d%Y")
    date = time.strftime("%Y%m%d", date)
    report["date"] = date

    # FIND REPORT WE WANT
    fund_pattern = re.compile(m_name)
    tags = soup.find_all("u", text=fund_pattern)

    # Magic number - I know its the first tag
    parent_div = tags[0].parent.parent.parent
    limit = 4
    if (m_name == "Focus Fund"):
        parent_div = parent_div.next_sibling.next_sibling
        limit = 3

    tables = parent_div.find_all("table", limit=limit)

    for table in tables:
        rows = table.find_all("tr")
        for row in rows:
            divs = row.find_all("div")
            if (is_valid(divs)):
                if ("Net Assets" in divs[0].string): # Net assets line
                    net_assets = int(divs[2].string.replace(',', ''))
                    report["total_net_assets"] = net_assets
                else: # Just a regular entry
                    stock = clean_data([divs[0].string, divs[1].string, divs[2].string])
                    report["stocks"].append(stock)
            key, data = extract_meta(row) # Add common stocks stuff
            if key is not None:
                report[key] = data
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(report)


def nb_csr(soup, m_symbol, m_name):
    report = {}
    report["symbol"] = m_symbol
    report["stocks"] = []

    #Get Date
    text = "Schedule of Investments " + m_name
    pattern = re.compile(text)
    tag = soup.find("p", text=pattern)
    date = tag.string.replace(text, '')
    date = re.sub('[/\t\n\s,\xa0]', '', date)
    date = time.strptime(date, "%B%d%Y")
    date = time.strftime("%Y%m%d", date)
    report["date"] = date

    div = tag.parent
    more_stocks = True
    done = False
    while not done:
        table, div = find_next_table(div)
        for row in table.find_all("tr"):
            if more_stocks:
                # Magic number - actual data entries have 21 columns
                if (len(row) == 21):
                    data = extract_data(row)
                    stock = clean_data(data) 
                    report["stocks"].append(stock)
            if row.find("b") is not None:
                key, data = extract_meta(row)
                if key is not None:
                    report[key] = data
                if key == "common_stocks":
                    more_stocks = False
            if row.find("p", text=re.compile("Net Assets")):
                key, data = extract_meta(row)
                if key == 'total_net_assets':
                    report[key] = data
                    done = True
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(report)


def find_next_table(div):
    div = div.next_sibling.next_sibling
    table = div.find("table")
    # If next table is not on this page
    while table is None:
        div = div.next_sibling.next_sibling
        if div.find("table") == -1:
            div = div.next_element.next_element.next_element
            div = div.next_sibling.next_sibling
        table = div.find("table")
    return table, div


def extract_meta(row):
    total_investments = re.compile(r"Total Investments")
    common_stocks = re.compile(r"Total Common Stocks")
    net_assets = re.compile(r"Net Assets")

    value = 0
    key = None

    line = []
    for item in row.stripped_strings:
        line.append(item)
    
    if len(line) == 0:
        return key, value

    total_inv = total_investments.search(line[0])
    total_com = common_stocks.search(line[0])
    net_ass = net_assets.search(line[0])


    if total_inv is not None:
        key = "total_investment"
    elif total_com is not None:
        key = "common_stocks"
    elif net_ass is not None:
        key = "total_net_assets"

    if key is not None:
        value = int(line[len(line) - 1].replace(',','').replace('$', ''))
    return key, value


def extract_data(row):
    name_inc = re.compile(r"[A-Za-z]+(\.|,)?")
    number = re.compile(r"[1-9]+")
    data = []
    for col in row.stripped_strings:
        num = number.search(col)
        name = name_inc.search(col) 
        if num is not None:
            data.append(col)
        elif name is not None: 
            data.append(col)
    # Company name can span multiple divs, need to get all of it
    company = ""
    shares = data.pop(len(data) - 2)
    value = data.pop(len(data) - 1)
    for string in data:
        company += string
    return [company, shares, value]


def is_valid(divs):
    if len(divs) != 3:
        return False
    elif divs[0].string is None:
        return False
    elif divs[1].string is None:
        return False
    elif divs[2].string is None:
        return False
    else:
        return True


def clean_data(data):
    substrings = [
            "*",
            "(a)",
            "(b)",
            "(c)",
            "(d)",
            "(e)",
            ]

    company = data[0]
    shares = int(data[1].replace(',', ''))
    value = int(data[2].replace(',', '').replace('$', ''))

    # Remove undesired symbols from company name
    for substring in substrings:
        company = company.replace(substring, '')    

    stock = {
            "company": company,
            "shares": shares,
            "value": value,
            }
    return stock


def main():
    soup = get_soup(NB_QR_URL)
    nb_qr(soup, "nbssx", "Focus Fund")
    nb_qr(soup, "nbmix", "Small Cap Growth Fund")

    soup = get_soup(NB_CSR_URL)
    nb_csr(soup, "nbssx", "Focus Fund")
    nb_csr(soup, "nbmix", "Small Cap Growth Fund")


if __name__ == "__main__":
    main()
