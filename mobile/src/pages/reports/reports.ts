import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { SecurityPage } from '../../pages/security/security';
import { Security, Fund, Stock } from '../../models/security';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  	security: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fundService: FundService) {
		this.security = null;
	}
	ngOnInit() {
		this.security = this.navParams.get('param');
	}
}
