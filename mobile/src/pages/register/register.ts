import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
