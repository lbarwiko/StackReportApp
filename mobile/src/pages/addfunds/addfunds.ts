import { Component, ApplicationRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams, MenuController, Loading, LoadingController } from 'ionic-angular';
import { FollowingService } from '../../services/following.service';
import { FundService } from '../../services/fund.service';
import { Security } from '../../models/security';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-addfunds',
  templateUrl: 'addfunds.html'
})

export class AddFundsPage {
	loading: Loading;
	fundList: Security[];
	user: User;
	requestList: any;

	constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
			 public followService: FollowingService, public fundService: FundService, public authService: AuthService,
			 public applicationRef: ApplicationRef) {
	    this.fundList = [];
	    this.requestList = [];
	    this.user = this.authService.user;
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

	checkFollowing(fund_id) {
		if(this.requestList && this.requestList.indexOf(fund_id) != -1) {
			return true;
		} else {
			return false;
		}
	}

	postFollow(fund_id) {
		// IMPORTANT! This 3 number is hard coded in and should be based upon the user's actual subscription eventually.
		if(this.requestList && 	this.requestList.length >= 3) {
			alert('You\'ve already selected 3 funds. Please unfollow one before you choose another.');
			return;
		}
		this.requestList.push(fund_id);
	}	

	removeFollow(fund_id) {
		var i = this.requestList.indexOf(fund_id);
		if(i != -1) {
			this.requestList.splice(i, 1);
		}
	}

	submitFollows() {
		for(var i in this.requestList) {
			this.followService.insertFollow(this.requestList[i])
			.then(status => {
				
			})
			.catch(err => {
				console.log(err);
			});	
		}
		this.navCtrl.push(HomePage);
	}

	showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
      dismissOnPageChange: false
    });
    this.loading.present();
  }
}
