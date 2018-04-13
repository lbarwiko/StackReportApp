import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EndpointService } from './endpoint.service';
import { User } from '../models/user';


@Injectable()
export class AuthService {
    user : User;
    token: string;
    constructor (   private storage: Storage, 
                    private http: Http, 
                    public endpointService: EndpointService
    ){}

    public login(loginCredentials): Promise<any>{
        let headers = new Headers({ 
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.endpointService.base + this.endpointService.auth, loginCredentials, options).toPromise()
        .then(res=>{
            var resJson = res.json();
            console.log(resJson);
            if(resJson.err){
                return this.handleErrorPromise(resJson);
            }
            this.user = new User(resJson);
            return this.storage.set('token', this.user.token);
        })
        .then(tokenSet=>{
            return Promise.resolve(this.user);
        })
        .catch(err=>{
            console.log(err);
            if(err && err.status == 401 || err.status == 403){
                return this.handleInvalidCredentials;
            }
            return this.handleErrorPromise;
        });
    }

    private getStoredTokenAndUser(): Promise<any>{
        if(this.user){
            return Promise.resolve(this.user);
        }else if(this.token){
            return this.getUserFromToken();
        }else{
            return this.getStoredToken()
            .then(token=>{
                if(!token){
                    return Promise.resolve(null);
                }
                return this.getUserFromToken();
            })
            .catch(err=>{
                return this.handleErrorPromise(err);
            })
        }
    }

    public flow(): Promise<any>{
        return this.getUser();
    }

    private getStoredToken(): Promise<any>{
        if(this.token){
            return Promise.resolve(this.token);
        }

        return this.storage.get('token')
        .then((token) => {
            this.token = token;
            return Promise.resolve(this.token);
        })
        .catch(this.handleTokenErrorPromise);
    }

    public logout(){
        this.storage.remove('token');
    }

    public getUser(): Promise<any>{
        if(this.user){
            console.log(this.user);
            return Promise.resolve(this.user);
        }else{
            if(this.token){
                console.log(this.token);
                return this.getUserFromToken();
            }else{
                return this.getStoredTokenAndUser();
            }
        }
    }

    private getUserFromToken(): Promise<any>{
        if(!this.token){
            return Promise.reject(null);
        }
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': this.token
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.endpointService.base + this.endpointService.me, options).toPromise()
        .then(res=>{
            var resJson = res.json();
            console.log(resJson);
            if(resJson.err){
                return this.handleErrorPromise(resJson);
            }
            resJson['token'] = this.token;
            this.user = new User(resJson);
            return Promise.resolve(this.user);
        })
        .catch(err=>{
            return this.handleErrorPromise(err)
        });
    }

    private isFirstTime(): Promise<any>{
        return this.storage.get('stackreportEntry')
        .then(isFirstTime=>{
            return Promise.resolve(isFirstTime);
        })
        .catch(err=>{
            return Promise.resolve(null);
        })
    }

    private handleInvalidCredentials(): any{
        return this.handleErrorPromise({
            err: 'Invalid username or password'
        });
    }

    private handleTokenErrorPromise(error: Response | any){
        this.storage.remove('token');
        return this.storage.set('token', null)
        .then(res=>{
            this.handleErrorPromise({
                err: 'Something Went Wrong!'
            })
        })
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        alert(error.message || error.err);
	    location.reload();
        return Promise.reject(error.message || error);
    }    
} 