import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from './../menu/menu';
import { IonicPage, AlertController, Loading, LoadingController} from 'ionic-angular';

@Component({
  templateUrl: 'onboarding.html'
})
export class OnboardingPage {
  loading: Loading;
  constructor(private loadingCtrl: LoadingController, private alertController: AlertController,
              public authService: AuthService, public navCtrl: NavController, public navParams: NavParams ) {}
  slides = [
    {
      title: "Invest Smarter, Not Harder",
      description: "Make a strategy like a mutual fund by getting <b>predictions</b> on their holdings.",
      image: "../../assets/img/piggy@3x.svg",
    },
    {
      title: "Get Reports With Predictions",
      description: "Stack reports give you a prediction on what stocks or other investments were bought or sold by a Mutual Fund.",
      image: "../../assets/img/reports@3x.svg",
    },
    {
      title: "3 Free Stack Reports Per Quarter",
      description: "The first three Stack Reports are on us! With Stack Report Gold a user can gain access to 10 reports or more every quarter.",
      image: "../../assets/img/gold@3x.svg",
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
