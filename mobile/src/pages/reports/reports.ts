import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { TopFundsPage } from '../topfunds/topfunds';
import { RegionalfundsPage } from '../regionalfunds/regionalfunds';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
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
			this.lastUpdated = predictionList.data[0].meta.date_predicted;
			predictionList.data[0].prediction.forEach(pred => {
				if(pred.order_type == 1) {
					this.buyPredictions.push(pred);
				} else if(pred.order_type == -1) {
					this.sellPredictions.push(pred);
				}
			})
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
