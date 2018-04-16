import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IonicPage, NavController, NavParams, Loading, LoadingController} from 'ionic-angular';

import { MenuPage } from './../menu/menu';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loading: Loading;
  registerCredentials = {username: '', email:'', password: '', confirm: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, public authService: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register(){
  	console.log('Register');
    this.showLoading();
    let registerCredentials = {
      username: this.registerCredentials.username,
      email:this.registerCredentials.email,
      password: this.registerCredentials.password
    };
    this.authService.registerUser(registerCredentials)
    .then(user => {
      console.log("Here");

      this.loading.dismiss();
      this.navCtrl.setRoot(MenuPage);   
    })
    .catch(err => {
      this.loading.dismiss();
      alert(err);
      location.reload();
      console.log(err)
    });
    //this.restapiProvider.CreateAccount(registerCredentials);
    //;
  }

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
