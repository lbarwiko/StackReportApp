import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { SecurityPage } from '../../pages/security/security';
import { Security, Fund, Stock } from '../../models/security';
import { AuthService } from '../../services/auth.service';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { TopFundsPage } from '../topfunds/topfunds';
import { RegionalfundsPage } from '../regionalfunds/regionalfunds';

@IonicPage()
@Component({
  selector: 'page-investments',
  templateUrl: 'investments.html',
})
export class InvestmentsPage {

  	security: any;
  	user: User;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fundService: FundService,
	public authService:AuthService, public menuCtrl:MenuController) {
		this.security = null;
		this.user = this.authService.getLoggedInUser();
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



	  openMenu() {
	    this.menuCtrl.open();
	  }
	 
	  closeMenu() {
	    this.menuCtrl.close();
	  }
	 
	  toggleMenu() {
	    this.menuCtrl.toggle();
	  }

	  navToTopFunds(){
	    this.navCtrl.push(TopFundsPage);
	  }

	  navToByRegionPage(){
	    this.navCtrl.push(RegionalfundsPage);
	  }

	  navUserInfo(){
	    this.navCtrl.push(UserPage);
	  }

	  logout() {
	    this.authService.logout();
	    this.navCtrl.push(LoginPage);
	  }

	  navPortfolioPage() {
	  	//this.navCtrl.poptoroot(); maybe this?
	    this.navCtrl.push(HomePage);
	  }

}
