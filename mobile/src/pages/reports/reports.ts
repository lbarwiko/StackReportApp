import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { SecurityPage } from '../../pages/security/security';
import { Security, Fund, Stock } from '../../models/security';
import { PredictionService } from '../../services/prediction.service'

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  	security: any;
  	buyPredictions: any;
  	sellPredictions: any;
  	lastUpdated: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		public predictionService: PredictionService) {
		this.security = null;
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

}
