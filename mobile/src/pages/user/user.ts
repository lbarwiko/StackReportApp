import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TierService } from '../../services/tier.service';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  current_user: User;
  tier_options: any;
  selected_value: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private authService: AuthService, public menuCtrl: MenuController,
              private tierService: TierService, private alertCtrl: AlertController) {
    this.current_user = authService.user;
    this.tier_options = [];
    this.listTiers();
  }

  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  navUserInfo(){
    this.menuCtrl.toggle();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }

  navPortfolioPage() {
    this.navCtrl.push(HomePage);
  }

  listTiers() {
    this.tierService.listTiers()
    .then(tier_list => {
      tier_list.forEach(tier=>{
        console.log(tier);
        if(tier.tier_type != "FREE") {
          this.tier_options.push(tier.tier_type + " (" + tier.max_reports + " custom reports)");
        }
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
        title: 'Are you sure?',
          message: 'Your card will be charged for this action.',
          buttons: [
            {
              text: 'Cancel',
                handler: () => {
                  console.log('Disagree clicked');
                }
            },
            {
                text: 'Confirm',
                handler: () => {
                  this.updateTier()
                  console.log('Agree clicked');
              }  
             }
          ]
      });
      confirm.present();
  }

  showCancelConfirm() {
    let confirm = this.alertCtrl.create({
        title: 'Are you sure?',
          message: 'You will lose all funds you are following.',
          buttons: [
            {
              text: 'Cancel',
                handler: () => {
                  console.log('Disagree clicked');
                }
            },
            {
                text: 'Confirm',
                handler: () => {
                  this.cancelSubscription()
                  console.log('Agree clicked');
              }  
             }
          ]
      });
      confirm.present();
  }

  updateTier(){
    // get the name of the tier
    let paren_index = this.selected_value.indexOf('(');
    let new_tier = this.selected_value.substring(0, paren_index - 1);  

    this.tierService.putTier(new_tier)
    .then(status => {
      this.current_user.tier = new_tier;
    })
    .catch(err => {
      alert("Operation unsuccessful");
      console.log(err);
    });  
  }

  cancelSubscription() {
    this.tierService.putTier("FREE")
    .then(status => {
      this.current_user.tier = "FREE";
    })
    .catch(err => {
      alert("Operation unsuccessful");
      console.log(err);
    });  
  }

}
