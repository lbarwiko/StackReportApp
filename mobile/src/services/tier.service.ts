import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { EndpointService } from './endpoint.service';
import { AuthService } from './auth.service';

@Injectable()
export class TierService {
    // url = ApiEndpoint.base + ApiEndpoint.fund;
    url: string;
    
    constructor(private http:Http, public endpointService: EndpointService, 
                private authService: AuthService) { 
        this.url = this.endpointService.base + '/api/t';
    }
    

    listTiers(): Promise<any> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json',
                'Authorization': this.authService.user.getToken()
            });
            let options = new RequestOptions({ headers: headers });

            let apiUrl = this.url;

            this.http.get(apiUrl, options).toPromise()
            .then(res=>{
                var resJson = res.json();

                return resolve(resJson);
            })
            .catch(this.handleErrorPromise);
        })
    }

    putTier(tier: string): Promise<boolean> {
        return new Promise((resolve, reject)=> {
            let headers = new Headers({ 
                'Content-Type': 'application/json',
                'Authorization': this.authService.user.getToken()
            });

            let options = new RequestOptions({ headers: headers });

            // the url is a bit different here
            let me_url = this.endpointService.base + '/api/me/t';

            let tier_object = {"tier": tier};

            this.http.put(me_url, tier_object, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                return resolve(resJson.code == 201 ? true : false);
            })
            .catch(this.handleErrorPromise);
        })
    } 

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }    
} 