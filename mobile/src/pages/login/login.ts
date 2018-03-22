import { Component } from '@angular/core';
import { IonicPage, AlertController, Loading, LoadingController} from 'ionic-angular';
import { RegisterPage } from './../register/register';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  loginCredentials = {username: '', password: ''};
  user: User;

  constructor(private loadingCtrl: LoadingController, private alertController: AlertController,
   public authService: AuthService, public navCtrl: NavController, public navParams: NavParams ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public createAccount(){
    console.log('Navigate to register page.');
    this.navCtrl.push(RegisterPage);
  }

  public resetLoginPage(){
    let alert = this.alertController.create({
      title: 'Invalid Login',
      subTitle: 'Username or password incorrect.',
      buttons: [{text:'OK', handler: () => {
        this.loading.dismiss();
        this.loginCredentials.password = '';
      }}]
    });
    // alert.present(prompt);
}

  public login(){

    /*
    google how to find if ionic is in dev mode
    send post request to localhost:8000/api/auth, production endpoint
    create endpoint service, if dev export localhost endpoint else export production endpoint
    
    */
    this.showLoading();
    console.log('login');
    this.authService.login({username: this.loginCredentials.username, password: this.loginCredentials.password})
    .then(user => {if(user && user.username) this.navCtrl.setRoot(HomePage); else this.resetLoginPage()});
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertController.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
