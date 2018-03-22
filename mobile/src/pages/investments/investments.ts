import { Component, ApplicationRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SecurityService } from '../../services/security.service';
import { SecurityPage } from '../../pages/security/security';
import { Security, Fund, Stock } from '../../models/security';

@IonicPage()
@Component({
  selector: 'page-investments',
  templateUrl: 'investments.html',
})
export class InvestmentsPage {

	  security: any;
	  totalPrice: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, public securityService: SecurityService, public applicationRef: ApplicationRef) {
		this.security = null;
	}

	ngOnInit() {
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
			this.applicationRef.tick();
		})
		.catch(err=>console.log(err));
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
