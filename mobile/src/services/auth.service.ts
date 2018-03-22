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
    constructor(private http:Http, public restapiProvider: RestapiProvider, private storage:Storage) { }

    public login(loginCredentials): Promise<User>{
        return new Promise((resolve, reject) => {
                this.restapiProvider.Login(loginCredentials)
                .then(user => {if(user) resolve(this.authenticate(user)); else reject(user);});
        });
    }

    public logout(){
        this.storage.remove('token');
    }

    public getUser(token): Promise<User>{
        return new Promise((resolve, reject) => {
            this.restapiProvider.getUser(token)
            .then(user => {if(user) resolve(this.assign(user, token)); else reject(user);});
        });
    }

    public getLoggedInUser():User{
        return this.user;
    }

    public assign(user, token): Promise<User>{
        console.log('Got a User');
        console.log(user);
        user.token = token;
        return new Promise((resolve, reject) => {
            this.user = new User(user);
            resolve(this.user);
        });
    }

    public authenticate(res): Promise<User>{
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