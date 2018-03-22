import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/main';
import { TopFundsPage, LoginPage, HomePage, MainDashboardPage } from '../../pages/main';

@Component({
  selector: 'component-navbar',
  templateUrl: 'navBar.html'
})

export class NavBarComponent {

  user:User;
  
  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public authService:AuthService) {
    this.user=authService.getLoggedInUser();
  }
  
  backButton() {
      if (this.navCtrl.getActive().name != HomePage.name)
        this.navCtrl.pop();
      return;
  }

  menuButton() {
      this.navCtrl.push(MainDashboardPage);
    return;
  }

  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
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
    //this.navCtrl.push(TopFundsPage);
    this.navCtrl.push(MainDashboardPage);
  }

  navToByRegionPage(){
    this.navCtrl.push(TopFundsPage);//needs to be changed to the region page
  }

  navPortfolioPage() {
    this.navCtrl.push(TopFundsPage);//needs to be changed to the portfolio page
  }

}