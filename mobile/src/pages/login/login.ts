import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Loading, LoadingController} from 'ionic-angular';
import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';
import { RestapiProvider } from '../../providers/restapi/restapi';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController,
  public restapiProvider: RestapiProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public createAccount(){
    console.log('Navigate to register page.');
    this.navCtrl.push(RegisterPage);
  }

  public login(){

    /*
    google how to find if ionic is in dev mode
    send post request to localhost:8000/api/auth, production endpoint
    create endpoint service, if dev export localhost endpoint else export production endpoint
    
    */
    this.showLoading();

    console.log('login');
    console.log(this.restapiProvider.Login({username: this.registerCredentials.username, password: this.registerCredentials.password}));
    this.navCtrl.setRoot(HomePage);
    /*
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.navCtrl.setRoot(HomePage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });*/
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
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
