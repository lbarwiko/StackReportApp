import sys  
from PyQt4.QtGui import *  
from PyQt4.QtCore import *  
from PyQt4.QtWebKit import *  
from lxml import html 

class Render(QWebPage):  
  def __init__(self, url):  
    self.app = QApplication(sys.argv)  
    QWebPage.__init__(self)  
    self.loadFinished.connect(self._loadFinished)  
    self.mainFrame().load(QUrl(url))  
    self.app.exec_()  
  
  def _loadFinished(self, result):  
    self.frame = self.mainFrame()  
    self.app.quit() 

def scrap(url):
	return 0 


def main():
	url = "https://finance.yahoo.com/quotes/MSFT,AAPL/view/v1?bypass=true"
	r = Render(url)
	scrap(url)


if __name__ == '__main__':
	main()

url = "https://finance.yahoo.com/quotes/MSFT,AAPL/view/v1?bypass=true"
r = Render(url)