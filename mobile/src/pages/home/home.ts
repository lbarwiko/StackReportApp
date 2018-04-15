import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams, MenuController, Loading, LoadingController } from 'ionic-angular';
import { AddFundsPage } from '../addfunds/addfunds';
import { UserPage } from '../user/user';
import { FollowingService } from '../../services/following.service';
import { FundService } from '../../services/fund.service';
import { Security } from '../../models/security';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  fundList: Security[];
  user: User;
	loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
              public followService: FollowingService, public fundService: FundService, 
              public authService: AuthService, private loadingCtrl: LoadingController,) {
    this.fundList = [];
    this.user = authService.user;
  }

  ngOnInit() {
      this.showLoading();
      this.followService.getAllFollowing()
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
        this.loading.dismiss();
      })
      .catch(err => {
        this.loading.dismiss();
        console.log(err);
      });  
  }
  showLoading() {
		this.loading = this.loadingCtrl.create({
		  content: 'Loading Watchlist...',
		});
		this.loading.present();
	  }
}
