import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { Security, Fund, Stock } from '../../models/security';


@Component({
  selector: 'page-security',
  templateUrl: 'security.html'
})

export class SecurityPage {

	security: Security;
	volume_traded: string;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.security = null;
	}

	ngOnInit() {
		this.security = this.navParams.get('param');
		this.volume_traded = this.security.price_history[0]['5. volume'];
		// this will remove the investments and reports buttons if the security is a stock
		if(this.security instanceof Stock) {
			var node = document.getElementById('investments-btn-row');
			while (node.hasChildNodes()) {
    			node.removeChild(node.lastChild);
			}	
			node = document.getElementById('reports-btn-row');
			while (node.hasChildNodes()) {
    			node.removeChild(node.lastChild);
			}
		}
	}

}
