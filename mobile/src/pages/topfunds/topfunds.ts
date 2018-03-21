import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { FundService } from '../../services/fund.service'


@Component({
  selector: 'page-topfunds',
  templateUrl: 'topfunds.html'
})

export class TopfundsPage {
	fundList: string[];

	constructor(public fundService: FundService) {
		this.fundList = [];
	}

	ngOnInit() {
		this.fundService.listFunds()
		.then(returnedList => {
			console.log('test');
			console.log(returnedList);
			this.fundList = returnedList;
		})
		.catch(err => {
			console.log(err);
		});	
	}

	
}
