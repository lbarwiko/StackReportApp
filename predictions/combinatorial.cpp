/*
program to run different combinations of stock trades, selecting the one with lowest error (l1-error)
starts by assuming 0 trades were made, then calculates the error with 0 changes
next, assumes 1 trade was made, then calculates the error with every combination of 1 change
next, assumes 2 trades were made, then calculates the error with every combination of 2 changes
...
repeat search_depth times, and choose trade combination with lowest error
this is basically the bastard child of linear regression and combinatorial regression, stuffed into a search algorithm
*/

#include <vector>
#include <cstdlib>
#include <string>
#include <utility>
#include <iostream>
#include <numeric>
#include <cmath>
#include <algorithm>
#include <fstream>
#include <tuple>

using namespace std;

struct MutualFund {
	// struct to store mf representation
	// this is simply a container for mf data
	// mf ticker symbol
	string mf_symbol;
	// stock symbol strings for stock the mf holds
	vector<string> symbols;
	// current share price of each stock held in order of symbols
	vector<double> prices;
	// number of shares of each stock held in order of symbols
	vector<int> num_shares_held;
	// total value of mf stock assets
	double stock_assets;
};

MutualFund load_data(const string& mf_symbol) {
	// load mf_symbol data into a MutualFund object
	// return MutualFund
	MutualFund mf;
	mf.mf_symbol = mf_symbol;
		
	/*
	mf.symbols = {"UTX", "UPS", "KO", "PEP", "ECL", "PX", "EMR", "APH", "BDX", "SYK", "UNH", "PG", "MMM", "GOOGL", "ACN", "BR", "CTSH", "MA", "WAT", "OMC", "JNJ", "INTU", "MSFT", "ORCL", "TJX", "AAPL", "NKE"};
	mf.prices = {121.4500, 121.4500, 45.7700, 116.5200, 135.9200, 153.9200, 64.8200, 90.5900, 228.2100, 156.0000, 228.1700, 89.9900, 243.1400, 1036.1700, 148.0100, 90.2600, 72.2800, 150.4700, 197.1700, 71.4400, 139.3300, 157.2200, 84.1700, 49.0600, 75.5500, 171.8500, 60.4200};
	mf.num_shares_held = {2609000, 1326000, 2344000, 3163000, 2080000, 2069000, 2187000, 1892000, 1834000, 2004000, 1403000, 2434000, 1154600, 191000, 1638000, 872000, 2355000, 1287000, 813987, 3253000, 2078000, 885000, 4453000, 6095000, 2712000, 1087000, 3135000};
	mf.stock_assets = 6378548241;
	//mf.stock_assets = 6378547241;
	*/

	// load data from tmp file
	ifstream infile("/root/StackReport/predictions/tmp/" + mf_symbol + ".txt");
	int num_holdings;
	infile >> num_holdings;
	for (int i = 0; i < num_holdings; ++i) {
		string symbol;
		infile >> symbol;
		mf.symbols.push_back(symbol);
	}

	for (int i = 0; i < num_holdings; ++i) {
		int num_shares_held;
		infile >> num_shares_held;
		mf.num_shares_held.push_back(num_shares_held);
	}

	for (int i = 0; i < num_holdings; ++i) {
		double price;
		infile >> price;
		mf.prices.push_back(price);
	}

	double stock_assets;
	infile >> stock_assets;
	mf.stock_assets = stock_assets;
	infile.close();

	return mf;
}

double get_error(const vector<double>& prices, const vector<int>& num_shares_held, 
	double stock_assets) {
	// calculate l1 error
	// stock_assets = p1n1 + p2n2 + ... + pdnd + error, where p's are prices and n's 
	// are hypothesized num_shares_held
	double prod = inner_product(prices.begin(), prices.end(), num_shares_held.begin(), 0.0);

	return abs(stock_assets - prod);
}

vector<vector<int>> gen_combinations(int n, int r) {
	// calculates all the different combinations n choose r
	// returns a vector of vector of integer indices
	// these indices represent the list items corresponding to the elements in the combination
	vector<vector<int>> combinations;
	vector<bool> filter(n);
	fill(filter.begin(), filter.begin() + r, true);

	do {
		vector<int> indices;
		for (int i = 0; i < n; ++i) {
			// run filter over n in order to only select elements in the combination
			if (filter[i]) indices.push_back(i);
		}

		combinations.push_back(indices);
	} while (prev_permutation(filter.begin(), filter.end()));
	
	return combinations;
}

double get_comb_value(const MutualFund& mf, const vector<int>& combination) {
	// return dot product of stocks in combination with their prices
	// combination is a potential trade combination
	vector<double> traded_prices;
	vector<int> traded_num_shares_held;
	for (int index : combination) {
		traded_prices.push_back(mf.prices[index]);
		traded_num_shares_held.push_back(mf.num_shares_held[index]);
	}

	return inner_product(traded_prices.begin(), traded_prices.end(), traded_num_shares_held.begin(), 0.0);
}

void gen_search_space(double p, int n, double k, int& max_value, int& min_value, 
	int step_size, double percent_range) {
	// generate search space limits based on constraints
	// modifies max and min value by setting to search space limits
	// we can eliminate share values that overshoot the target
	int max_n_value = static_cast<int>(floor(k/p));
	// we can eliminate share values that are not within percent_range
	int max_with_percent = static_cast<int>(round((1+percent_range)*n));
	max_value = (max_with_percent < max_n_value) ? max_with_percent : max_n_value;
	// round to nearest step_size
	max_value = (max_value + step_size/2) / step_size * step_size;
	if (!max_value) max_value = step_size;

	// TODO can we get rid of the 1? min_with_percent will almost always be > 1
	int min_with_percent = static_cast<int>(round((1-percent_range)*n));
	min_value = (min_with_percent > 1) ? min_with_percent : 1;
	// round to nearest step_size
	min_value = (min_value + step_size/2) / step_size * step_size;
	if (!min_value) min_value = step_size;
}

//TODO add vector.reserve for known sizes
//TODO create struct to contain parameters
void ilp_solve(const MutualFund& mf, vector<int>& combination, double k, int step_size, 
	const double percent_range, double& min_error, vector<int>& best_num_shares_held, const double initial_k, 
	const vector<int>& initial_combination, vector<int>& num_shares_acc) {
	// solve the integer linear programming problem to minimize the error function
	// error = |k - P'N'|
	// modifies min_error and min_weights (these are essentially the return values)
	// base case, trivial solution for only 1 variable
	if (combination.size() == 1) {
		int last_n = static_cast<int>(round(k/mf.prices[initial_combination.back()]));
		last_n = (last_n + step_size/2) / step_size * step_size;
		double current_error = 0;
		for (size_t i = 0; i < num_shares_acc.size(); ++i) current_error += mf.prices[initial_combination[i]]*num_shares_acc[i];
		current_error = abs(initial_k - current_error - mf.prices[initial_combination.back()]*last_n);

		// if current_error is new min, reassign min_error and min_weights
		// strictly less for reassignment to reflect the idea that
		// combinations with fewer trades are simpler and more likely
		if (current_error < min_error) {
			min_error = current_error;
			best_num_shares_held = mf.num_shares_held;
			for (size_t i = 0; i < initial_combination.size() - 1; ++i) 
				best_num_shares_held[initial_combination[i]] = num_shares_acc[i];

			best_num_shares_held[initial_combination.back()] = last_n;
			//TODO keep track of prev error and pop num_shares_acc twice if error increased? not sure if this works
		}
		
		return;
	}

	// start from the last variable
	int max_value;
	int min_value;
	int last_index = combination.back();
	int n = mf.num_shares_held[last_index];
	double p = mf.prices[last_index];
	gen_search_space(p, n, k, max_value, min_value, step_size, percent_range);
	for (int nd = max_value; nd >= min_value; nd -= step_size) {
		// hold nd constant and solve subproblem without nd, then repeat with decremented nd
		double new_k = k - p*nd;
		num_shares_acc.push_back(nd);
		combination.pop_back();
		ilp_solve(mf, combination, new_k, step_size, percent_range,	min_error, best_num_shares_held,
			initial_k, initial_combination, num_shares_acc);
		combination.push_back(last_index);
		// remove last accumulated weight so we can later try a different one
		num_shares_acc.pop_back();
	}
}

pair<double, vector<int>> predict(const MutualFund& mf, int search_depth, int step_size, 
	double percent_range) {
	// make prediction as to what stocks mf currently holds using above algorithm
	// n is max number of changes in mf's portfolio to consider (search depth)
	// return pair of min error and vector of new portfolio weights (num_shares_held)
	// initialize by assuming 0 trades
	double min_error = get_error(mf.prices, mf.num_shares_held, mf.stock_assets);
	vector<int> best_num_shares_held = mf.num_shares_held;
	const double p_dot_n = inner_product(mf.prices.begin(), mf.prices.end(), mf.num_shares_held.begin(), 0.0);
	vector<int> num_shares_acc;
	
	// for each depth level
	for (int num_changes = 1; num_changes <= search_depth; ++num_changes) {
		// test out every combination of number of changes
		vector<vector<int>> combinations = gen_combinations(mf.num_shares_held.size(), num_changes);
		for (auto& combination : combinations) {
			// k is goal value for this combination, found in error = |k - P'N'|
			// it is the approximate value of the traded stocks, if this combination is the correct guess
			double k = mf.stock_assets - p_dot_n + get_comb_value(mf, combination);
			ilp_solve(mf, combination, k, step_size, percent_range, min_error, best_num_shares_held,
				mf.stock_assets, combination, num_shares_acc);
		}
	}

	return make_pair(min_error, best_num_shares_held);
}

void save_result(const MutualFund& mf, const vector<int>& result) {
	// save data in mf_symbol_comb.json
	// follows restAPI specification
	string output = "{\n\t\"fund_id\": \"" + mf.mf_symbol + "\",\n\t\"securities\": [";
	for (size_t i = 0; i < mf.symbols.size(); ++i) {
		string order_type = "0";
		if (result[i] > mf.num_shares_held[i]) order_type = "1";
		if (result[i] < mf.num_shares_held[i]) order_type = "-1";
		output += "\n\t\t{\"security_id\": \"" + mf.symbols[i] + "\", \"order_type\": " +
			order_type + ", \"amount\": " + to_string(result[i]) + "}, ";
	}
	output.pop_back();
	output.pop_back();
	output += "\n\t]\n}";

	ofstream file("/root/StackReport/predictions/Output/" + mf.mf_symbol + "_comb.json");
	file << output;
	file.close();
}

int main(int argc, char** argv) {
	string mf_symbol;
	int search_depth;
	int step_size;
	double percent_range;

	// read in clargs
	if (argc != 5) {
		cout << "Error reading arguments." << endl;
		cout << "Usage: ./combexe mf_symbol search_depth step_size percent_range" << endl;
		return 1;
	}
	mf_symbol = argv[1];
	search_depth = atoi(argv[2]);
	step_size = atoi(argv[3]);
	percent_range = atof(argv[4]);
	
	MutualFund mf = load_data(mf_symbol);
	double min_error;
	vector<int> result;
	tie(min_error, result) = predict(mf, search_depth, step_size, percent_range);
	save_result(mf, result);
		
	return 0;
}

