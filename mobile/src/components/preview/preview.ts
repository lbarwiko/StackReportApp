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
	price_color: string;

	constructor(public fundService: FundService) {
		this.fund = new Fund("fund_id");
		this.price_color = "price white";
	}

	ngAfterViewInit() {
		this.fund = new Fund(this.fund_id_from_front);
		this.fundService.getFund(this.fund_id_from_front)
		.then(res => {
			this.fund.fund_name = res.fund_name;
			this.fund.price_history = res.price_history;
			// get the closing price of the most recent day
			this.fund.current_price = this.fund.price_history[0]['4. close'];

			if(this.fund.current_price < this.fund.price_history[0]['1. open']) {
				this.price_color = "price red";
			} else if (this.fund.current_price > this.fund.price_history[0]['1. open']) {
				this.price_color = "price green";
			}

		})
		.catch(err => {
			console.log(err);
		});		
	}
}