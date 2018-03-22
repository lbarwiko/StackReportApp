import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { TopFundsPage } from '../topfunds/topfunds';
import { RegionalfundsPage } from '../regionalfunds/regionalfunds';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  current_user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, public menuCtrl: MenuController) {
    this.current_user = authService.getLoggedInUser();
  }

  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  navToTopFunds(){
    this.navCtrl.push(TopFundsPage);
  }

  navToByRegionPage(){
    this.navCtrl.push(RegionalfundsPage);
  }

  navUserInfo(){
    this.menuCtrl.toggle();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }

  navPortfolioPage() {
    this.navCtrl.push(HomePage);
  }

}
