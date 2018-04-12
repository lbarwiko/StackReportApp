import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { EndpointService } from './endpoint.service';
import { User } from '../models/user';

@Injectable()
export class UserService {
    /*url: string;
    constructor(private http:Http, private endpointService: EndpointService) { 
        this.url = this.endpointService.getBase() + this.endpointService.getUser();
    }*/
    url: string;
    constructor(private http:Http, public endpointService: EndpointService) { 
        this.url = this.endpointService.base + '/api/security';
    }

    getUsers(page:Number = 0, size:Number = 10): Promise<User[]> {
        return new Promise((resolve, reject)=>{
            let options = new RequestOptions({
                params: {
                    page: page,
                    size: size
                  }
            })
            console.log("this.url");
            console.log(this.url);
            this.http.get(this.url, options).toPromise()
            .then(res=>{
                return resolve(this.extractData(res))
            })
	        .catch(this.handleErrorPromise);
        })
    }

    addUser(user:User): Promise<User> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // TODO: Consider changing this to an observable.
        return new Promise((resolve, reject) =>{
            this.http.post(this.url, user, options).toPromise()
	        .then(res=>{
                return resolve(this.extractData(res));
            })
            .catch(this.handleErrorPromise);
        })
    }		
    
    registerAnon(): Promise<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let payload = {
            anon: true
        };
        return new Promise((resolve, reject) =>{
            this.http.post(this.url, payload, options).toPromise()
	        .then(res=>{
                return resolve(this.extractData(res));
            })
            .catch(this.handleErrorPromise);
        })
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