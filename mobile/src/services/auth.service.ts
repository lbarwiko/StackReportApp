import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';
import { RestapiProvider } from '../providers/restapi/restapi';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {
    user : User;
    constructor(public restapiProvider: RestapiProvider, private storage:Storage) { }

    public login(loginCredentials): Promise<User>{
        return new Promise((resolve, reject) => {
                this.restapiProvider.Login(loginCredentials)
                .then(user => {
                    if(user && user.username) {
                        resolve(this.authenticate(user)); 
                    } else {
                        resolve(user);
                    }
                });
        });
    }

    public logout(){
        this.storage.remove('token');
    }

    public getUser(token): Promise<User>{
        return new Promise((resolve, reject) => {
            this.restapiProvider.getUser(token)
            .then(user => {
                if(user) {
                   resolve(this.assign(user, token)); 
                } else {
                   reject(user);
                }
            })
            .catch(this.handleErrorPromise);;
        });
    }

    public getLoggedInUser():User{
        return this.user;
    }

    public assign(user, token): Promise<User>{
        user.token = token;
        return new Promise((resolve, reject) => {
            this.user = new User(user);
            resolve(this.user);
        });
    }

    public authenticate(res): Promise<User>{
        return new Promise((resolve, reject) => {
            this.user = new User(res);
            this.storage.set('token', this.user.token);
            resolve(this.user);
        });
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }    
} 