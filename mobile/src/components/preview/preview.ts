import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';
// import { FundService } from '../../services/fund'
// import { Fund } from '../../models/fund';

@IonicPage()
@Component({
  selector: 'component-preview',
  templateUrl: 'preview.html',
})
export class PreviewComponent {
	
	// fund: Fund;

	// constructor(fund_id:String, public fundService: FundService) {
		// fund = null;
		// fundService.getFund(fund_id)
		// .then(res=>{
		// 	fund = res;
		// })
		// .catch(err=>{
		// 	console.log(err);
		// })
	// }
}
