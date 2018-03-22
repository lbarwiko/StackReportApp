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

    url: string;
    
    constructor(private http:Http, public endpointService: EndpointService) { 
        this.url = this.endpointService.base + '/api/f';
    }
    

    listFunds(): Promise<string[]> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.get(this.url, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                var idList: string[] = [];

                for(let i in resJson.data) {
                    idList.push(resJson.data[i]['fund_id']);
                }

                return resolve(idList);
            })
            .catch(this.handleErrorPromise);
        })
    }

    getFund(fund_id:string): Promise<Fund> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.get(this.url + '/' + fund_id, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                var fundToReturn = new Fund(resJson.fund_id, resJson.fund_name, resJson.price_history);
                // console.log(resJson.holdings);
                fundToReturn.setHoldings(resJson.holdings);
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