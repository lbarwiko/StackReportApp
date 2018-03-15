import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user : User;
  username : string;

  constructor(public navCtrl: NavController, public authService : AuthService) {
  	this.user = authService.getUser();
  	this.username = this.user.getUsername();
  }

}
