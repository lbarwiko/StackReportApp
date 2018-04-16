import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Security, Fund, Stock } from '../../models/security';
import { InvestmentsPage } from '../../pages/investments/investments';
import { ReportsPage } from '../../pages/reports/reports';
import { FollowingService } from '../../services/following.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-security',
  templateUrl: 'security.html'
})

export class SecurityPage {

	security: Security;
	volume_traded: number;
	follow_status: boolean;
	is_stock: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private followService: FollowingService, private alertCtrl: AlertController) {
		this.security = null;
		this.follow_status = false;
		this.is_stock = true;
	}

	ngOnInit() {
		this.security = this.navParams.get('param');
		this.volume_traded = this.security.volume_traded;
		// this will remove the investments and reports buttons if the security is a stock
		if(this.security instanceof Fund) {
			this.is_stock = false;
		} else {
			this.is_stock = true;
		}
		if(!this.is_stock) {
			console.log('this is not a stock');
			this.checkFollowing();
		}
	}

	showConfirm() {
		let confirm = this.alertCtrl.create({
	  		title: 'Follow this fund?',
	      	message: 'Are you sure you want to follow this fund? Doing so will allow you to follow one fewer fund for this quarter.',
	      	buttons: [
	        	{
	      			text: 'Cancel',
	          		handler: () => {
	            		console.log('Disagree clicked');
	          		}
	        	},
	        	{
	         	 	text: 'Confirm',
	          		handler: () => {
	          			this.postFollow()
	            		console.log('Agree clicked');
	      			}	
	       		}
	      	]
    	});
    	confirm.present();
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
}
