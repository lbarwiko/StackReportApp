import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { Fund } from '../../models/fund';

@Component({
  selector: 'component-preview',
  templateUrl: 'preview.html',
})
export class PreviewComponent {
	
	@Input('fund_id_in') fund_id_from_front;

	fund: Fund;

	constructor(public fundService: FundService) {
		this.fund = new Fund("fund_id");
	}

	ngAfterViewInit() {
		this.fund = new Fund(this.fund_id_from_front);
		this.fundService.getFund(this.fund_id_from_front)
		.then(res => {
			console.log(res);
			this.fund.fund_name = res.fund_name;
		})
		.catch(err => {
			console.log(err);
		});		
	}
}