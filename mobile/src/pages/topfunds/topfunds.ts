import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { MainDashboardPage } from '../mainDashboard/mainDashboard';
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
    this.menuCtrl.toggle();
  }

  navToByRegionPage(){
    this.navCtrl.push(RegionalfundsPage);//needs to be changed to the region page
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
