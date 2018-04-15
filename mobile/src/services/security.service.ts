import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EndpointService } from './endpoint.service';
import { Security } from '../models/security';
import { AuthService } from './auth.service';
//import { Holding } from '../models/holding.model';


@Injectable()
export class SecurityService {

    url: string;
    
    constructor(private http:Http, public endpointService: EndpointService, 
                private authService: AuthService) { 
        this.url = this.endpointService.base + '/api/security';
    }
    

    get(security_id:String): Promise<any> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json', 
                'Authorization': this.authService.user.getToken()
            });
            let options = new RequestOptions({ headers: headers });

            this.http.get(this.url + '/' + security_id, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                return resolve(resJson);
            })
            .catch(this.handleErrorPromise);
        })
    }

    getBatch(holding_metas:any): Promise<any> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            var reqUrl = this.url + '?symbols='
            holding_metas.forEach(holding_meta=>{
                reqUrl += holding_meta.security_id + ',';
            })
            console.log(reqUrl);
            this.http.get(reqUrl, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                console.log("Reponse", resJson);
                var securities = [];
                for(var i=0; i<resJson.length; i+=1){
                    securities.push(this.parseSecurity(resJson[i]));
                }
                console.log("New response", securities);
                return resolve(securities);
            })
            .catch(this.handleErrorPromise);
        });
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }    

    private parseSecurity(res){
        var price_history = [];
        for(var i=0; i<res.price_history.length; i++){
            price_history.push({
                "date": res.price_history[i].date,
                "price": res.price_history[i].close
            });
        }
        return new Security(res.security_id, res.security_name, 
            res.quote.latestPrice, res.quote.latestVolume, 
            price_history);
    }

    private extractData(res: Response) {
        let body = res.json();

        // implement this

        return body.data || [];
    }

} 