import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'component-preview',
  templateUrl: 'preview.html',
})
export class PreviewComponent {
	
	ticker: string;
	price: double;


	constructor() {
		this.ticker = "AAPL";
		this.price = 999.99;
	}
}
