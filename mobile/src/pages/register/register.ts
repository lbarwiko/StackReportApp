import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginPage } from '../login/login';
import { IonicPage, NavController, NavParams, Loading, LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loading: Loading;
  registerCredentials = {username: '', email:'', password: '', confirm: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, public userService: UserService) {}

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
    this.userService.registerUser(registerCredentials)
    .then(user => console.log(user))
    .catch(err => console.log(err));
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


  private extractData(res: Response) {
    let body = res.json();
    return body.data || [];
  }

  private handleErrorPromise (error: Response | any) {
      console.error(error.message || error);
      return Promise.reject(error.message || error);
  }

}
