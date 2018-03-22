import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { SecurityPage } from '../../pages/security/security';
import { Security, Fund, Stock } from '../../models/security';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { TopFundsPage } from '../topfunds/topfunds';
import { RegionalfundsPage } from '../regionalfunds/regionalfunds';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { FollowingService } from '../../services/following.service';
import { PredictionService } from '../../services/prediction.service'

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  	security: any;
  	user: User;
  	buyPredictions: any;
  	sellPredictions: any;
  	lastUpdated: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fundService: FundService, public menuCtrl:MenuController, public authService: AuthService, public predictionService: PredictionService) {
		this.security = null;
		this.user = authService.getLoggedInUser();
		this.buyPredictions = [];
		this.sellPredictions = [];
		this.lastUpdated = "1/1/2000";
	}

	ngOnInit() {
		this.security = this.navParams.get('param');
		this.getPredictions();
	}

	getPredictions() {
		this.predictionService.getPredictions(this.security.id)
		.then(predictionList => {
			console.log(predictionList);
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
	    this.menuCtrl.toggle();
	  }
}
