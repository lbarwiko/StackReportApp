import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { FollowingService } from '../../services/following.service';
import { FundService } from '../../services/fund.service';
import { Security } from '../../models/security';
import { TopFundsPage } from '../topfunds/topfunds';

@Component({
  selector: 'page-regionalfunds',
  templateUrl: 'regionalfunds.html'
})

export class RegionalfundsPage {
	fundList: Security[];
	user: User;

	constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
       public followService: FollowingService, public fundService: FundService, public authService: AuthService) {
	    this.fundList = [];
	    this.user = this.authService.getLoggedInUser();
  	}

	ngOnInit() {
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
    this.navCtrl.push(RegionalfundsPage);
    this.menuCtrl.toggle();
  }

  navToByRegionPage(){
    this.menuCtrl.toggle();
  }
  
  navUserInfo(){
    this.navCtrl.push(UserPage);
  }

  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }

  navPortfolioPage() {
    this.navCtrl.push(HomePage);
  }

}

