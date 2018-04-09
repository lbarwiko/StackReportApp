import re
import time
import pprint
from helper import get_soup


nb_qr_url = "https://www.sec.gov/Archives/edgar/data/44402/000089843218000111/nq.htm"


# TODO: Where does total investment come from?
def nb_qr(url, m_symbol, m_name):
    soup = get_soup(url)

    report = {}
    report["symbol"] = m_symbol
    report["stocks"] = []
    report['total_stock'] = 0
    report['num_shares'] = 0

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
                    stock = clean_data(divs)
                    report['total_stock'] += stock['value']
                    report['num_shares'] += stock['shares']
                    report["stocks"].append(stock)
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(report)


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

    company = data[0].string
    shares = int(data[1].string.replace(',', ''))
    value = int(data[2].string.replace(',', '').replace('$', ''))

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
    nb_qr(nb_qr_url, "nbssx", "Focus Fund")
    nb_qr(nb_qr_url, "nbmix", "Small Cap Growth Fund")


if __name__ == "__main__":
    main()
