import { Component } from '@angular/core';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { LoginPage } from '../login/login';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loading: Loading;
  registerCredentials = {username: '', password: '', confirm: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController, public restapiProvider: RestapiProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register(){
  	console.log('Register');
    this.showLoading();
    console.log(this.restapiProvider.CreateAccount({username: this.registerCredentials.username, password: this.registerCredentials.password}));
    this.navCtrl.setRoot(LoginPage);
  }

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  public anothetFunction(){
  	console.log('a');
  }

}