import datetime
from helper import * 

def generate_testing():

	end_date = datetime.datetime.now()
	start_date = datetime.date(2016, 11, 30)
	delta = datetime.timedelta(days=1)
	ratio = {}
	ratio["JNVSX"] = 0.107099683
	ratio["JNVIX"] = 0.893543131
	tuple_list = []
	while (start_date <= end_date):
		date = start_date.strftime("%Y%m%d")

		if date == "20170531":
			ratio["JNVSX"] = 0.0783778946
			ratio["JNVIX"] = 0.921622105
			print (ratio)

		if date == "20171130":
			ratio["JNVSX"] = 0.0721508946
			ratio["JNVIX"] = 0.927849105
			print(ratio)

		nav = 0
		nav += get_db_mf_nav("JNVIX", date)*ratio["JNVIX"]
		nav += get_db_mf_nav("JNVSX", date)*ratio["JNVSX"]

		print (nav)
		start_date += delta
		tuple_list.append(("JENSGF", date, nav))

	add_tuple_mf_history(tuple_list)





def main():
	generate_testing()







if __name__ == '__main__':
	main()