import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { RestapiProvider } from '../providers/restapi/restapi';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';

@Injectable()
export class AuthService {
    user : User;
    url = "http://localhost:8000/api/auth/";
    constructor(private http:Http, public restapiProvider: RestapiProvider) { }

    public login(loginCredentials){
        return this.restapiProvider.Login(loginCredentials).then(res => this.user = new User(res));
    }

    public getUser(){
        return this.user;
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