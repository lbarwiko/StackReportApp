import { Component, ApplicationRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams, MenuController, Loading, LoadingController } from 'ionic-angular';
import { FollowingService } from '../../services/following.service';
import { FundService } from '../../services/fund.service';
import { Security } from '../../models/security';

@Component({
  selector: 'page-allfunds',
  templateUrl: 'allfunds.html'
})

export class AllFundsPage {
	loading: Loading;
	fundList: Security[];
	user: User;
	next: string;

	constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
			 public followService: FollowingService, public fundService: FundService, public authService: AuthService,
			 public applicationRef: ApplicationRef) {
	    this.fundList = [];
	    this.user = this.authService.user;
	    this.next = "";
  	}

	ngOnInit() {
		this.showLoading();

		this.fundService.listFunds(this.next)
		.then(fund_meta_list => {
			var promiseList = [];
			this.next = fund_meta_list.next;
			fund_meta_list.idList.forEach(fund=>{
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

  	doInfinite(infiniteScroll) {
  		console.log('Begin async operation');

	    setTimeout(() => {
	      this.fundService.listFunds(this.next)
			.then(fund_meta_list => {
				console.log("calling again");
				var promiseList = [];
				this.next = fund_meta_list.next;
				fund_meta_list.idList.forEach(fund=>{
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
				fund_list.forEach(fund=>{
					this.fundList.push(fund)
				})
			})
			.catch(err => {
				console.log(err);
			});

	      console.log('Async operation has ended');
	      infiniteScroll.complete();
	    }, 500);
	}
}
