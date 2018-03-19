import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user : User;
  username : string;

  constructor(public authService:AuthService, navCtrl: NavController, navParams: NavParams) {
  	this.user = this.authService.getUser();
  	this.username = this.user.getUsername();
  	console.log(this.user);
  	console.log(this.username);
  }

}
