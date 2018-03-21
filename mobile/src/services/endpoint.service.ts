import { Injectable } from '@angular/core';

@Injectable()
export class EndpointService {
	base: string;
	user: string;
	me: string;
	prediction: string;
	fund: string;

    constructor() {
    	let fvariable: boolean = false;
		if (fvariable) {
			this.base = 'http://stackreport.io';
		} else {	
			this.base = 'http://localhost:8000';	
		}
		this.fund = '/api/f';
		this.user = '/api/u';
		this.me = '/api/me';
		this.prediction = '/api/p';
		this.auth = '/api/auth';
     }

     getUser(){
     	return this.user;
     }

     getBase(){
     	return this.base;
     }

} 
