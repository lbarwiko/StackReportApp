import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { EndpointService } from './endpoint.service';
import { AuthService } from './auth.service';

    
@Injectable()
export class FollowingService {
    // url = ApiEndpoint.base + ApiEndpoint.fund;

    url: string;
    
    constructor(private http:Http, public endpointService: EndpointService, 
                private authService: AuthService) { 
        this.url = this.endpointService.base + '/api/f';
    }
    
    isFollowing(fund_id:string): Promise<boolean> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 
                'Content-Type': 'application/json',
                'Authorization': this.authService.user.getToken()
            });
            let options = new RequestOptions({ headers: headers });

            let currentUser = this.authService.user;

            this.http.get(this.url + '/' + fund_id + '/follow', options).toPromise()
            .then(res=>{
                var resJson = res.json();
                return resolve(resJson.exists);
            })
            .catch(this.handleErrorPromise);
        })
    }

    insertFollow(fund_id:string): Promise<boolean> {
        return new Promise((resolve, reject)=> {
            let headers = new Headers({ 
                'Content-Type': 'application/json',
                'Authorization': this.authService.user.getToken()
            });
            let options = new RequestOptions({ headers: headers });

            let currentUser = this.authService.user;

            this.http.post(this.url + '/' + fund_id + '/follow', {}, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                return resolve(resJson.code == 201 ? true : false);
            })
            .catch(this.handleErrorPromise);
        })
    }

    deleteFollow(fund_id:string): Promise<boolean> {
        return new Promise((resolve, reject)=> {
            let headers = new Headers({ 
                'Content-Type': 'application/json',
                'Authorization': this.authService.user.getToken()
            });
            let options = new RequestOptions({ headers: headers });

            let currentUser = this.authService.user;

            this.http.delete(this.url + '/' + fund_id + '/follow', options).toPromise()
            .then(res=>{
                var resJson = res.json();
                return resolve(resJson.code == 201 ? true : false);
            })
            .catch(this.handleErrorPromise);
        })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }    
} 