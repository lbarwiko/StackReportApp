import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EndpointService } from './endpoint.service';
import { Fund } from '../models/security';
import { HoldingMeta } from '../models/holding.model';

@Injectable()
export class FundService {
    // url = ApiEndpoint.base + ApiEndpoint.fund;
    url: string;
    
    constructor(private http:Http, public endpointService: EndpointService) { 
        this.url = this.endpointService.base + '/api/f';
    }
    

    listFunds(next): Promise<any> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            let apiUrl = this.url;

            if(next.length > 0) {
                apiUrl = this.endpointService.base + next;
            }

            this.http.get(apiUrl, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                var idList: string[] = [];

                for(let i in resJson.data) {
                    idList.push(resJson.data[i]['fund_id']);
                }

                var toReturn = {'idList': idList, 'next': resJson.next};

                return resolve(toReturn);
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
                let data = this.extractData(res);
                let fund_to_return = new Fund(data.fund_id, data.fund_name,
                                            data.current_price, data.volume_traded,
                                            data.price_history, data.holdings);
                return resolve(fund_to_return);
            })
            .catch(this.handleErrorPromise);
        })
    } 

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        // alphavantage data parsing
        let price_history = [];
        for(let i in body.price_history) {
            price_history.push({
                "date": body.price_history[i]["date"],
                "price": body.price_history[i]["4. close"]
            });
        }
        var current_price = -1, volume_traded = -1;
        if(price_history.length > 0){
            current_price = price_history[0]['price'];
            volume_traded = body.price_history[0]["5. volume"];
        }
        var holdings = [];
        for(var i=0; i<body.holdings.length; i+=1){
            holdings[i] = new HoldingMeta(body.holdings[i].security_id, body.holdings[i].num_shares);
        }
        return {
            "fund_id": body.fund_id,   
            "fund_name": body.fund_name,
            "holdings": holdings,
            "price_history": price_history,
            "current_price": current_price,
            "volume_traded": volume_traded,
        };
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }    
} 