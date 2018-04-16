import { IonicPage, NavController, NavParams, Loading, MenuController, LoadingController } from 'ionic-angular';
import { FundService } from '../../services/fund.service';
import { Component, ApplicationRef } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { AuthService } from '../../services/auth.service';
import { HoldingService } from '../../services/holding.service';
import { User } from '../../models/user';
import { SecurityPage } from '../../pages/security/security';

@IonicPage()
@Component({
  selector: 'page-investments',
  templateUrl: 'investments.html',
})
export class InvestmentsPage {

  	fund: any;
  	user: User;
	totalPrice: number;
	loading: Loading;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fundService: FundService,
	public authService:AuthService, public menuCtrl:MenuController, public securityService: SecurityService, 
	public applicationRef: ApplicationRef, private loadingCtrl: LoadingController,
	public holdingService: HoldingService) {
		this.user = this.authService.user;
	}

	ngOnInit() {
		this.showLoading()
		this.fund = this.navParams.get('param');
		this.totalPrice = 0;

		console.log("holdings", this.fund.holdings);
		console.log(this.fund);
		if(this.fund.holdings && (!this.fund.holdings[0] || !this.fund.holdings[0].security)){
			this.securityService.getBatch(this.fund.holdings)
			.then(securities=>{
				this.fund.setHoldings(
					this.holdingService.holdingMetaToHolding(this.fund.holdings, securities)
				);
				this.calculateTotalPrice();
				console.log("totalPrice", this.totalPrice);
				console.log("this.fund", this.fund);
				this.applicationRef.tick();
				this.loading.dismiss();
			})
			.catch(err=>{
				this.loading.dismiss();
				console.log(err)
			});
		}else{
			this.calculateTotalPrice();
			this.applicationRef.tick();
			this.loading.dismiss();
		}
	}

	calculateTotalPrice(){
		this.totalPrice = 0;
		this.fund.holdings.forEach(holding=>{
			this.totalPrice += holding.security.current_price*holding.num_shares;
		})
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
		  content: 'Loading...',
		  dismissOnPageChange: false
		});
		this.loading.present();
	  }

	openStockPage(stock) {
		this.navCtrl.push(SecurityPage, {
			param: stock
		});
	}

}
