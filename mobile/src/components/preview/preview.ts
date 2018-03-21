import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { Security } from '../../models/security';

@Component({
  selector: 'component-preview',
  templateUrl: 'preview.html',
})
export class PreviewComponent {
	
	@Input('fund_id_in') fund_id_from_front;

	fund: Security;
	price_color: string;

	constructor(public fundService: FundService) {
		this.fund = null;
		this.price_color = "price white";
	}

	ngOnInit(){
		this.fundService.getFund(this.fund_id_from_front)
		.then(fundReturned => {
			this.fund = fundReturned;

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

	ngAfterViewInit() {
		
	}
}