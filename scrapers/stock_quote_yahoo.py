from bs4 import BeautifulSoup
from selenium import webdriver
import sys
sys.path.append(sys.path[0]+"/../")
from mfscrapers.helper import get_soup
import time

def load_stocks_daily_yahoo(driver, stock_list_string):
  """
  Return the a list of tuple (stock symbol, live stock quote)
  """
  print ("getting one batch")
  url = "https://finance.yahoo.com/quotes/%s/view/v1?bypass=true" % stock_list_string
  driver.get(url)
  time.sleep(5)
  soup = BeautifulSoup(driver.page_source, 'html.parser')
  table = soup.find("table", class_="_2VeNv")
  tbody = table.find("tbody")
  rows = tbody.find_all("tr")
  
  tuple_list = []

  for row in rows:
    td_tags = list(row.find_all("td"))
    idx = 0

    tuple_list.append((td_tags[0].get_text(), td_tags[1].get_text()))

  return tuple_list


def main():
  
  options = webdriver.ChromeOptions()
  options.add_argument('headless')
  driver = webdriver.Chrome('/mnt/c/Users/Roy/Desktop/StackReport/chromedriver', options=options)
  stock_list = "AAPL,KO,TEAM,MSFT,STAR,AOS,NKE,KO,TEAM,MSFT,STAR,AOS,NKE,KO,TEAM,MSFT,STAR,AOS,NKE,KO,TEAM,MSFT,STAR,AOS,NKE,KO,TEAM,MSFT,STAR,AOS,NKE"
  tuple_list = get_stock_daily_yahoo(driver, stock_list)
  for tuple in tuple_list:
    print(tuple)
  return 1


if __name__ == '__main__':
  main()