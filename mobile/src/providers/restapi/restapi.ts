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

  Login(loginCredentials){
  	console.log('Logging In');
	  return new Promise(resolve => {
			this.http.post('http://localhost:8100/api/auth', loginCredentials, {headers: {'Content-Type': 'application/json'}});
	  });

  }

  CreateAccount(registerCredentials){
  	console.log('Creating Account');
  	console.log('Username: ' + registerCredentials.username);
  	console.log('Password: ' + registerCredentials.password);
	  return new Promise(resolve => {
			this.http.post('http://localhost:8100/api/u', registerCredentials, {headers: {'Content-Type': 'application/json'}});
			/*.then(console.log(registerCredentials)).catch(error => {console.log(error.status)});*/
	  });

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
