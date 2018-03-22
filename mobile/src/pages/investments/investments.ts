import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { SecurityPage } from '../../pages/security/security';
import { Security, Fund, Stock } from '../../models/security';

@IonicPage()
@Component({
  selector: 'page-investments',
  templateUrl: 'investments.html',
})
export class InvestmentsPage {

  	security: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fundService: FundService) {
		this.security = null;
	}

	ngOnInit() {
		this.security = this.navParams.get('param');
		this.security.holdings = [
	  		{
	  			id: 'aapl',
	  			name: 'Apple',
	  			current_price: 99.99,
	  			num_shares: 100,
	  			percent_total: 25
	  		},
	  		{
	  			id: 'googl',
	  			name: 'Alphabet',
	  			current_price: 919.99,
	  			num_shares: 50,
	  			percent_total: 30
	  		},
	  		{
	  			id: 'msft',
	  			name: 'Microsoft',
	  			current_price: 9.99,
	  			num_shares: 13,
	  			percent_total: 15
	  		},
	  		{
	  			id: 'fb',
	  			name: 'Facebook',
	  			current_price: 50,
	  			num_shares: 140,
	  			percent_total: 18
	  		},
	  		{
	  			id: 'amzn',
	  			name: 'Amazon',
	  			current_price: 199.99,
	  			num_shares: 36,
	  			percent_total: 12
	  		}
	  	];
	}

	openStockPage(stock_id) {
		this.fundService.getFund(stock_id)
		.then(stockObject=>{
			this.navCtrl.push(SecurityPage, {
	    		param: stockObject
	    	});
		})
		.catch(err => {
			console.log(err);
		});
	}
}
