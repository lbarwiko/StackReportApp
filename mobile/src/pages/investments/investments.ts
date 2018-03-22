import { IonicPage, NavController, NavParams, Loading, MenuController, LoadingController } from 'ionic-angular';
import { FundService } from '../../services/fund.service';
import { Component, ApplicationRef } from '@angular/core';
import { SecurityService } from '../../services/security.service';
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
	totalPrice: number;
	loading: Loading;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fundService: FundService,
	public authService:AuthService, public menuCtrl:MenuController, public securityService: SecurityService, 
	public applicationRef: ApplicationRef, private loadingCtrl: LoadingController) {
		this.user = this.authService.getLoggedInUser();
	}

	ngOnInit() {
		this.showLoading()

		this.security = this.navParams.get('param');
		this.totalPrice = 0;

		var promiseList = [];
		this.security.holdings.forEach(holding=>{
			promiseList.push(
				new Promise((resolve, reject)=>{
					this.securityService.get(holding.security_id)
					.then(holdingRes=>{
						return resolve(holdingRes);
					})
					.catch(err=>reject(err))
				})
			);
		})
		Promise.all(promiseList)
		.then(securities=>{
			var i = 0;
			securities.forEach(security=>{
				var current_price = parseFloat(security.price_history[0]["4. close"]);
				this.totalPrice += current_price * this.security.holdings[i]['num_shares'];
				this.security.holdings[i]['current_price'] = current_price;
				i+=1;
			})
			this.loading.dismiss();
			this.applicationRef.tick();
		})
		.catch(err=>{
			this.loading.dismiss();
			console.log(err)
		});
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
		  content: 'Loading...',
		  dismissOnPageChange: false
		});
		this.loading.present();
	  }

	openStockPage(stock_id) {
		this.securityService.get(stock_id)
		.then(securityRes=>{
			console.log(securityRes);
			// this.navCtrl.push(SecurityPage, {
			// 	param: this.security
			// });
		})
	}

}
