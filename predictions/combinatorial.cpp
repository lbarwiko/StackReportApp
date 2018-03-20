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
#include <string>
#include <utility>
#include <iostream>
#include <numeric>
#include <cmath>
#include <algorithm>
#include <limits>
#include <fstream>

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
	// current net asset value of mf
	double nav;
	// total value of mf stock assets
	double stock_assets;
	// number of shares outstanding for the mf
	int n_shares;
};

MutualFund load_data(const string& mf_symbol) {
	// load mf_symbol data into a MutualFund object
	// return MutualFund

	MutualFund mf;
	mf.mf_symbol = mf_symbol;
		
	// TODO load data from db

	return mf;
}

double get_error(const vector<double>& prices, const vector<double>& num_shares_held, 
	double stock_assets) {
	// calculate l1 error
	// stock_assets = p1n1 + p2n2 + ... + pdnd + error, where p's are prices and n's 
	// are hypothesized num_shares_held

	return abs(stock_assets - inner_product(prices.begin(), prices.end(), num_shares_held.begin(), 0.0));
}

vector<vector<int>> generate_combinations(int n, int k) {
	// calculates all the different combinations n choose k
	// returns a vector of vector of integer indices
	// these indices represent the list items corresponding to the elements in the combination
	
	vector<vector<int>> combinations;
	vector<bool> filter(n);
	fill(filter.begin(), filter.begin() + k, true);

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

pair<double, vector<int>> predict(const MutualFund& mf, int search_depth) {
	// make prediction as to what stocks mf currently holds using above algorithm
	// n is max number of changes in mf's portfolio to consider (search depth)
	// return pair of min error and vector of new portfolio weights (num_shares_held)

	double min_error = numeric_limits<double>::max();
	
	// for each depth level
	for (int num_changes = 0; num_changes <= search_depth; ++num_changes) {
		// test out every combination of number of changes
	}
}

void save_result(const MutualFund& mf, const vector<int>& result) {
	// save data in mf_symbol_comb.json
	// follows restAPI specification
	// TODO fix this to save both quantities and securities
	string output = "{\n\t\"fund_id: \"" + mf.mf_symbol + "\",\n\t\"securities\": [";
	for (const auto& symbol : mf.symbols) output += "\"" + symbol + "\", ";
	output.pop_back();
	output.pop_back();
	output += "]\n}"

	ofstream file(mf.mf_symbol + "_comb.json");
	file << output;
	file.close();
}

int main(int argc, char** argv) {
	// read in search depth
	try int search_depth = argv[1];
	catch (...) cout << "Error reading argument, search_depth must be an integer >= 0" << endl;

	#TODO load mf_symbols from db

	vector<string> results;
	for (const auto& mf_symbol: mf_symbols) {
		MutualFund mf = load_data(mf_symbol);
		result = predict(mf, search_depth);
		save_result(mf, result);
	}
		
	return 0;
}

