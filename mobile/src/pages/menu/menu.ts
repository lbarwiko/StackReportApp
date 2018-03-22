import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Nav, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/main';

import { HomePage } from '../main';


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  user:User;


  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

}

openPage(page) {
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  this.nav.setRoot(page.component);
}

}