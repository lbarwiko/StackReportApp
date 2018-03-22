import { Component, ApplicationRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams, MenuController, Loading, LoadingController } from 'ionic-angular';
import { RegionalfundsPage } from '../regionalfunds/regionalfunds';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { FollowingService } from '../../services/following.service';
import { FundService } from '../../services/fund.service';
import { Security } from '../../models/security';

@Component({
  selector: 'page-topfunds',
  templateUrl: 'topfunds.html'
})

export class TopFundsPage {
	loading: Loading;
	fundList: Security[];
	user: User;

	constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
			 public followService: FollowingService, public fundService: FundService, public authService: AuthService,
			 public applicationRef: ApplicationRef) {
	    this.fundList = [];
	    this.user = this.authService.getLoggedInUser();
  	}

	ngOnInit() {
		this.showLoading();

		this.fundService.listFunds()
		.then(fund_meta_list => {
			var promiseList = [];
			fund_meta_list.forEach(fund=>{
				promiseList.push(
					new Promise((resolve, reject)=>{
						this.fundService.getFund(fund)
						.then(currentFund=>{
							return resolve(currentFund);
						})
						.catch(err=> reject(err));
					}
				))
			})
			return Promise.all(promiseList);
		})
		.then(fund_list=>{
			this.fundList = fund_list;
			console.log(this.fundList);
			this.applicationRef.tick();
			this.loading.dismiss();
		})
		.catch(err => {
			console.log(err);
		});	
	}

	showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
      dismissOnPageChange: false
    });
    this.loading.present();
  }



}
