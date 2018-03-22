import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { TopFundsPage } from '../topfunds/topfunds';
import { RegionalfundsPage } from '../regionalfunds/regionalfunds';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  navToTop100Page() {
    this.navCtrl.push(TopFundsPage);
  }

  navToRegionalFunds() {
    this.navCtrl.push(RegionalfundsPage);
  }

  navToUserPage() {
    this.navCtrl.push(UserPage);
  }
}
