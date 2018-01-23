import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi'

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})

export class TestPage {

  jData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  			  public restapiProvider: RestapiProvider) {
  	this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  getData() {
  	this.restapiProvider.getData()
  	.then(data => {
  		this.jData = data;
  		console.log(JSON.stringify(this.jData));
  	});
  }


}
