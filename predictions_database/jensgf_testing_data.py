import datetime
from helper import * 

def generate_testing():

	end_date = datetime.date(2018, 4, 12)
	start_date = datetime.date(2016, 11, 30)
	delta = datetime.timedelta(days=1)
	ratio = {}
	ratio["JENSX"] = 0.452884252
	ratio["JENRX"] = 0.00513979938
	ratio["JENIX"] = 0.52907326
	ratio["JENYX"] = 0.0129026888
	tuple_list = []
	while (start_date <= end_date):
		date = start_date.strftime("%Y%m%d")

		if date == "20170531":
			ratio["JENSX"] = 0.425241002
			ratio["JENRX"] = 0.00445649988
			ratio["JENIX"] = 0.498330125
			ratio["JENYX"] = 0.0719723729
			print (ratio)

		if date == "20171130":
			ratio["JENSX"] = 0.418685788
			ratio["JENRX"] = 0.00525984578
			ratio["JENIX"] = 0.501232024
			ratio["JENYX"] = 0.0748223416
			print(ratio)

		nav = 0
		nav += get_db_mf_nav("JENSX", date)*ratio["JENSX"]
		nav += get_db_mf_nav("JENRX", date)*ratio["JENRX"]
		nav += get_db_mf_nav("JENIX", date)*ratio["JENIX"]
		nav += get_db_mf_nav("JENYX", date)*ratio["JENYX"]

		print (nav)
		start_date += delta
		tuple_list.append(("JENSGF", date, nav))

	add_tuple_mf_history(tuple_list)





def main():
	generate_testing()







if __name__ == '__main__':
	main()