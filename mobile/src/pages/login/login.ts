import { Component } from '@angular/core';
import { IonicPage, AlertController, Loading, LoadingController} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams } from 'ionic-angular';
import { OnboardingPage } from './../onboarding/onboarding';
import { MenuPage } from './../menu/menu';
import { RegisterPage } from './../register/register';

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
    .then(user => {
      if(user && user.username){ 
        console.log("Succesful login");
        this.loading.dismiss();
        this.navCtrl.setRoot(MenuPage);
      }
      else {
        this.loading.dismiss();
        alert("Bad username or password");
      }
    })
    .catch(err=>{
      console.log("HERE2");
      console.log(err);
      this.loading.dismiss();
      alert(err);
      location.reload();
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


}
