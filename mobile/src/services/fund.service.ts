import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EndpointService } from './endpoint.service';
import { Fund } from '../models/security';

@Injectable()
export class FundService {
    // url = ApiEndpoint.base + ApiEndpoint.fund;

    url: string = "http://localhost:8000/api/f";
    
    constructor(private http:Http) { }

    getFund(fund_id:String): Promise<Fund> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            console.log("this.url");
            console.log(this.url);
            this.http.get(this.url + '/' + fund_id, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                var fundToReturn = new Fund(resJson.fund_id, resJson.fund_name, resJson.price_history);
                return resolve(fundToReturn);
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