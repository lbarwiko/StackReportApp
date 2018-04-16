import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/main';

import { HomePage, UserPage, AllFundsPage, LoginPage } from '../main';


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  user:User;
  hidden:string;
  authService:AuthService;
  app:App;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, authService:AuthService, app:App) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }, 
      { title: 'Offered Funds', component: AllFundsPage },
      { title: 'My account', component: UserPage },
    ];
    this.authService = authService;
    this.app = app;
  }

  back(){
    if(this.nav.canGoBack()){
        this.nav.pop();
    }
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  logout() {
      this.authService.logout();
      this.app.getRootNav().setRoot(LoginPage);
  }

  // check if the user is on the home page so that the back button can be hidden if needed
  checkHome() {
    var menuBtn = document.getElementsByClassName('menu-btn');
    if(typeof this.nav.last() == "undefined") {
      menuBtn[0].setAttribute("style", "margin-top: -3px");
      return false;
    } else if (this.nav.last().component.name == "HomePage") {
      menuBtn[0].setAttribute("style", "margin-top: -3px");
      return false;
    } else {
      menuBtn[0].setAttribute("style", "margin-top: -30px");
      return true;
    }
  }

}
