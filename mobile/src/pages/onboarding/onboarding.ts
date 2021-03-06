import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from './../menu/menu';
import { Loading, LoadingController} from 'ionic-angular';

@Component({
  templateUrl: 'onboarding.html'
})
export class OnboardingPage {
  loading: Loading;
  constructor(private loadingCtrl: LoadingController,
              public authService: AuthService, public navCtrl: NavController, public navParams: NavParams ) {}
  slides = [
    {
      title: "Invest Smarter, Not Harder",
      description: "Make a strategy like a mutual fund by getting <b>predictions</b> on their holdings.",
      image: "https://i.imgur.com/aA09N0k.png",
    },
    {
      title: "Get Reports With Predictions",
      description: "Stack reports give you a prediction on what stocks or other investments were bought or sold by a Mutual Fund.",
      image: "https://i.imgur.com/d0qkPMe.png",
    },
    {
      title: "3 Free Stack Reports Per Quarter",
      description: "The first three Stack Reports are on us! With Stack Report Gold a user can gain access to 10 reports or more every quarter.",
      image: "https://i.imgur.com/8gC0qRX.png",
    }
  ];

  continue() {
    this.showLoading();

    this.navCtrl.setRoot(MenuPage);        
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
