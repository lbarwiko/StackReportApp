import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { UserService } from '../../services/user.service'
import { User } from '../../models/main'

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  userList: User[];
  err: any;
  userToAdd: User;
  page: Number;
  
  constructor(public navCtrl: NavController, private userService: UserService) {
    this.getUsers();
    this.userToAdd = new User();
    this.page = 0;
  }

  ngOnInit(): void {
  }

  getUsers(){
    this.userService.getUsers()
      .then(res=>{
        console.log(res);
        this.userList = res;
      })
      .catch(err=>{
        this.err = err;
      })
  }

  
  addUser(){
    this.userService.addUser(this.userToAdd)
      .then(res=>{
        console.log(res);
      })
      .catch(err=> console.log(err));
  }

  logForm(){
    //console.log(this.userToAdd);
  }
}
