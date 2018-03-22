import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/main';
import { TopFundsPage, LoginPage } from '../main';


@Component({
  selector: 'page-mainDashboard',
  templateUrl: 'mainDashboard.html'
})

export class MainDashboardPage {

  user:User;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public authService:AuthService) {
    this.user=authService.getLoggedInUser();
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
    this.navCtrl.push(TopFundsPage)
  }

  navToByRegionPage(){
    this.navCtrl.push(TopFundsPage);//needs to be changed to the region page
  }

  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }

  navPortfolioPage() {
    this.navCtrl.push(TopFundsPage);//needs to be changed to the portfolio page
  }

}