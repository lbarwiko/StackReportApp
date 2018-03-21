import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { EndpointService } from '../../services/endpoint.service'

/*
  Generated class for the RestapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestapiProvider {

  constructor(public http: HttpClient, public endpointService: EndpointService) {
    console.log('Hello RestapiProvider Provider');
  }

  Login(loginCredentials): Promise<User>{
  	console.log('Logging In');
  	console.log(loginCredentials);
	return new Promise<User>(resolve => {
		this.http.post<User>(this.endpointService.base + this.endpointService.auth, loginCredentials, {headers: {'Content-Type': 'application/json'}})
			.subscribe(data => {
	      console.log('provider getting data');
	      resolve(data);
	    },err => {
	      console.log(err);
	    });
	});
  }

  getUser(token): Promise<User>{
  	console.log('checking token');
  	console.log(token);
  	return new Promise<User>(resolve => {
  		this.http.get<User>(this.endpointService.base + this.endpointService.me, {headers: {'Authorization': token}}).subscribe(data => {
	      console.log('provider getting user');
	      resolve(data);
	    },err => {
	      console.log(err);
	    });
  	});
  }

  CreateAccount(registerCredentials){
  	console.log('Creating Account');
  	/*console.log('Username: ' + registerCredentials.username);
  	console.log('Password: ' + registerCredentials.password);*/
	return new Promise(resolve => {
		this.http.post<User>(this.endpointService.base + this.endpointService.user, registerCredentials, 
			{headers: {'Content-Type': 'application/json'}})
			.subscribe(data => {
	      console.log('provider getting data');
	      resolve(data);
	    },err => {
	      console.log(err);
	    });
	});
  }

  getData() {
  	console.log('getting data <<<');
	  return new Promise(resolve => {
			this.http.get(this.endpointService.base + this.endpointService.fund)
			.subscribe(data => {
	      console.log('provider getting data');
	      resolve(data);
	    },err => {
	      console.log(err);
	    });
	  });
	}
}
