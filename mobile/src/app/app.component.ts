import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RootPage } from '../pages/root/root';
import { AuthService } from './../services/auth.service';
import { User } from '../models/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RootPage;
  token:string;
  user:User;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // getUserToken(){
  //   this.storage.get('token').then((token) => {
  //     console.log('Is Logged in : ', token);
  //     this.token = token;
  //     console.log(token);

  //     if(this.token){
  //       console.log("Here");
  //       this.authService.getUser(token).then(user => {
  //         if(user.username){ 
  //           this.rootPage = MenuPage;
  //         }
  //       });
  //     }
  //     else{
  //       this.rootPage = LoginPage;
  //     }
  //   });

  // }

}
