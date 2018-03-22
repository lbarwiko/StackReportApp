import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  current_user: User;
  
  constructor(public navCtrl: NavController, private userService: UserService, private authService: AuthService) {
    this.current_user = authService.user;
  }
}
