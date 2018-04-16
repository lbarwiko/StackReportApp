import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
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
                    public endpointService: EndpointService,

    ){}

    public login(loginCredentials): Promise<any>{
        let headers = new Headers({ 
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.endpointService.base + this.endpointService.auth, loginCredentials, options).toPromise()
        .then(res=>{
            console.log(res);
            if(res && res.status == 401){
                return Promise.reject({
                    err: 'Invalid username or password',
                    code: 401
                });
            }
            var resJson = res.json();
            if(resJson.err){
                return this.handleServerError(resJson);
            }
            this.user = new User(resJson);
            this.token = this.user.token;
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
        return this.isFirstTime()
        .then(firstTime=>{
            if(firstTime){
                return this.registerAnon()
            }
            return this.getUser();
        })
        .catch(err=> Promise.resolve(null));
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
            console.log(res);
            if(res.status == 401){
                return this.handleInvalidCredentials;
            }
            var resJson = res.json();
            if(resJson.err){
                return this.handleServerError(resJson);
            }
            resJson['token'] = this.token;
            this.user = new User(resJson);
            return Promise.resolve(this.user);
        })
        .catch(err=>{
            return this.handleErrorPromise(err)
        });
    }

    public registerUser(user:any): Promise<User> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.endpointService.base + '/api/u/', user, options).toPromise()
        .then(res=>{
            return Promise.resolve(this.extractData(res));
        })
        .then(userRes=>{
            if(!userRes || userRes.err){
                console.log("Found error", userRes);
               return Promise.reject(userRes.err);
            }
            this.user = new User(userRes);
            this.token = this.user.token;
            return this.storage.set('token', this.token);
        })
        .then(res=>{
            console.log("Set token");
            return Promise.resolve(this.user);
        })
        .catch(err=> Promise.reject(err));
    }		
    
    public registerAnon(): Promise<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let payload = {
            anon: true
        };
        return this.http.post(this.endpointService.base + '/api/u/', payload, options).toPromise()
        .then(res=>{
            return Promise.resolve(this.extractData(res));
        })
        .then(userRes=>{
            if(!userRes || userRes.err){
                console.log("Found error", userRes);
                return Promise.reject(userRes.err);
            }
            this.user = new User(userRes);
            this.token = this.user.token;
            return this.storage.set('token', this.token);
        })
        .then(res=>{
            return Promise.resolve(this.user);
        })
        .catch(err=> Promise.reject(null));

    }

    private extractData(res: Response) {
        console.log(res);
        let body = res.json();
        console.log(body);
        return body || {};
    }

    private isFirstTime(): Promise<any>{
        //return Promise.resolve(true);

        return this.storage.get('stackreportEntry')
        .then(isFirstTime=>{
            if(isFirstTime){
                return Promise.resolve(false);
            }
            return this.storage.set('stackreportEntry', true)
        })
        .then(res=>{
            if(!res){
                return Promise.resolve(false);
            }
            return Promise.resolve(true);
        })
        .catch(err=>{
            return this.storage.set('stackreportEntry', true)
            .then(res=>{
                return Promise.resolve(true);
            })
            .catch(err=>{
                return Promise.resolve(true);
            })
        })
    }

    private handleInvalidCredentials(): any{
        return this.handleServerError({
            err: 'Invalid username or password'
        });
    }

    private handleServerError(error: any): any{
        console.log(error);
        alert(error.err);
        location.reload();
        return Promise.reject(error);
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
        alert(error.message || error);
	    location.reload();
        return Promise.reject(error.message || error);
    }    
} 