import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';
import { FundService } from '../../services/fund.service'
import { Fund } from '../../models/fund';

// !!! this code heavily inspired by https://valor-software.com/ng2-charts/ (chart library example)

@Component({
  selector: 'component-fundgraph',
  templateUrl: 'fundGraph.html',
})
export class FundGraphComponent {

	@Input('fund_id_in') fund_id_from_front;

	fund: Fund;
	fundGraphHistory: [number];

	constructor(public fundService: FundService) {
		this.fund = new Fund("fund_id");
	}

  	public lineChartData:Array<any> = [
    	{data: [10, 30, 60, 100, 150]},
  	];
  	public lineChartLabels:Array<any> = ['1/1', '1/2', '1/3', '1/4', '1/5'];
  	public lineChartOptions:any = {
    	responsive: true
  	};
  	public lineChartColors:Array<any> = [
    	{ // grey
	      lineTension: 0,
	      lineWidth: 0.1,
	      borderColor: 'rgba(236,50,118,1)',
	      pointBackgroundColor: 'rgba(149,86,208,1)',
	      pointBorderColor: '#fff',
	      pointHoverBackgroundColor: '#fff',
	      pointHoverBorderColor: 'rgba(149,86,208,0.8)'
    	}
  	];
  	public lineChartLegend:boolean = false;
  	public lineChartType:string = 'line';

  	private populateGraph():void {
  		// populate graph (last 5 days; no idea why i need to access each of these lists differently)
		let tempPrices: number[] = [];
		[4, 3, 2, 1, 0].forEach((i) => {
			tempPrices.push(this.fund.price_history[i]['4. close']);

			let date = new Date(this.fund.price_history[i]['date']);
	  		let month = date.getMonth() + 1;
	  		let formatted = month + "/" + date.getDate();
			this.lineChartLabels[4 - i] = formatted;

		});
		this.lineChartData = tempPrices;
  	}

  	ngAfterViewInit() {
		this.fund = new Fund(this.fund_id_from_front);
		this.fundService.getFund(this.fund_id_from_front)
		.then(res => {
			this.fund.fund_name = res.fund_name;
			this.fund.price_history = res.price_history;
			// get the closing price of the most recent day
			this.fund.current_price = this.fund.price_history[0]['4. close'];
			this.populateGraph();			
		})
		.catch(err => {
			console.log(err);
		});		
	}

  	// events 
  	public chartClicked(e:any):void {
    	console.log(e);
  	}
 
  	public chartHovered(e:any):void {
    	console.log(e);
  	}
}