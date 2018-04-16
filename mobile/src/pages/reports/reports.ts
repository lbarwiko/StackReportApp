import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
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
  	current_page: number;
  	has_prev_page: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fundService: FundService, public menuCtrl:MenuController, public authService: AuthService, public predictionService: PredictionService) {
		this.security = null;
		this.user = authService.user;
		this.buyPredictions = [];
		this.sellPredictions = [];
		this.lastUpdated = "1/1/2000";
		this.current_page = 0;
		this.has_prev_page = false;
	}

	ngOnInit() {
		this.security = this.navParams.get('param');
		this.getPredictions(this.current_page);
	}

	getPredictions(page_number) {


		this.predictionService.getPredictions(this.security.id, page_number)
		.then(predictionList => {

			console.log(predictionList);

			if(predictionList.next != "") {
				this.has_prev_page = true;
			} else {
				this.has_prev_page = false;
			}
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

	prevButton() {
		this.clearData();
		this.current_page = this.current_page + 1;
		this.getPredictions(this.current_page);
	}

	nextButton() {
		this.clearData();
		if(this.current_page > 0) {
			this.current_page = this.current_page - 1;
		}
		this.getPredictions(this.current_page);
	}

	mostRecentButton() {
		this.clearData();
		this.current_page = 0;
		this.getPredictions(this.current_page);
	}

	private clearData() {
		this.lastUpdated = "1/1/2000";
		this.buyPredictions.length = 0;
		this.sellPredictions.length = 0;
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
