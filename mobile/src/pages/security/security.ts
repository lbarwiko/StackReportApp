import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { Security, Fund, Stock } from '../../models/security';
import { InvestmentsPage } from '../../pages/investments/investments';
import { ReportsPage } from '../../pages/reports/reports';
import { FollowingService } from '../../services/following.service';


@Component({
  selector: 'page-security',
  templateUrl: 'security.html'
})

export class SecurityPage {

	security: Security;
	volume_traded: string;
	follow_status: boolean;
	is_stock: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private followService: FollowingService) {
		this.security = null;
		this.follow_status = false;
	}

	ngOnInit() {
		this.security = this.navParams.get('param');
		this.volume_traded = this.security.price_history[0]['5. volume'];
		console.log(' on init ');
		this.checkFollowing();
		// this will remove the investments and reports buttons if the security is a stock
		if(this.security instanceof Stock) {
			this.is_stock = true;
		} else {
			this.is_stock = false;
		}
	}

	openInvestmentsPage() {
    	this.navCtrl.push(InvestmentsPage, {
    		param: this.security
    	});
	}

	openReportsPage() {
    	this.navCtrl.push(ReportsPage, {
    		param: this.security
    	});
	}

	checkFollowing() {
		this.followService.isFollowing(this.security.id)
		.then(is_following => {
			this.follow_status = is_following;
		})
		.catch(err => {
			console.log(err);
		});	
	}

	postFollow() {
		this.followService.insertFollow(this.security.id)
		.then(status => {
			if(status) {
				this.follow_status = true;
			}
		})
		.catch(err => {
			console.log(err);
		});	
	}

	removeFollow() {
		this.followService.deleteFollow(this.security.id)
		.then(status => {
			if(status) {
				this.follow_status = false;
			}
		})
		.catch(err => {
			console.log(err);
		});	
	}
}
