import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestapiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestapiProvider Provider');
  }

  getData() {
  	console.log('getting data <<<');
	  return new Promise(resolve => {
			this.http.get('http://localhost:8000/api/f')
			.subscribe(data => {
	      console.log('provider getting data');
	      resolve(data);
	    },err => {
	      console.log(err);
	    });
	  });
	}
}
