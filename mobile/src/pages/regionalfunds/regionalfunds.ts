import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { Security } from '../../models/security';


@Component({
  selector: 'page-regionalfunds',
  templateUrl: 'regionalfunds.html'
})

export class RegionalfundsPage {
	fundList: Security[];

	constructor(public fundService: FundService) {
		this.fundList = [];
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
}
