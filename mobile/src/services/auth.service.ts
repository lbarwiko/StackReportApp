import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { RestapiProvider } from '../providers/restapi/restapi';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {
    user : User;
    url = "http://localhost:8000/api/auth/";
    constructor(private http:Http, public restapiProvider: RestapiProvider, private storage:Storage) { }

    public login(loginCredentials){


    return new Promise((resolve, reject) => {
            this.restapiProvider.Login(loginCredentials)
            .then(user => {if(user) resolve(this.authenticate(user)); else reject(user);});
    });

        /*return new Promise( (resolve, reject) => {
            this.restapiProvider.Login(loginCredentials)
            .then(user => {if(user) this.authenticate(user); else reject(user);});
            });*/
    }

    public getUser(){
        return this.user;
    }

    public authenticate(res){

        return new Promise((resolve, reject) => {
            this.user = new User(res);
            console.log('User Set');
            console.log(this.user);
            this.storage.set('token', this.user.token);
            console.log(this.user.token);
            console.log('This is a promise?');
            resolve(this.user);
        });
    }

} 