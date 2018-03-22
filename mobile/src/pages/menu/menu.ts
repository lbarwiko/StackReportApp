import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/main';

import { HomePage, RegionalfundsPage, UserPage, TopFundsPage, LoginPage } from '../main';


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  user:User;


  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, authService:any}>;

  constructor(public platform: Platform, authService:AuthService) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, authService:'' }, 
      { title: 'Top Mutual Funds', component: TopFundsPage, authService:''},
      { title: 'Funds By Region', component: RegionalfundsPage, authService:''},
      { title: 'My account', component: UserPage, authService:'' },
      { title: 'Logout', component: LoginPage, authService:authService}
    ];

}

openPage(page) {
  if(page.authService != ''){
      page.authService.logout();
  }
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  this.nav.setRoot(page.component);
}

}
