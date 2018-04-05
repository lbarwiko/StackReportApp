import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EndpointService } from './endpoint.service';
// import { Security } from '../models/security';

@Injectable()
export class SecurityService {

    url: string;
    
    constructor(private http:Http, public endpointService: EndpointService) { 
        this.url = this.endpointService.base + '/api/security';
    }
    

    get(security_id:String): Promise<any> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.get(this.url + '/' + security_id, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                return resolve(resJson);
            })
            .catch(this.handleErrorPromise);
        })
    }

    getBatch(security_ids:any): Promise<any> {
        return new Promise((resolve, reject)=>{
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            var reqUrl = this.url + '?symbols='
            security_ids.forEach(security_id=>{
                this.url += security_id + ',';
            })
            console.log(this.url);
            this.http.get(reqUrl, options).toPromise()
            .then(res=>{
                var resJson = res.json();
                console.log("Reponse", resJson);
                return resolve(resJson);
            })
            .catch(this.handleErrorPromise);
        });
    }

    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }    

    private extractData(res: Response) {
        let body = res.json();

        // implement this

        return body.data || [];
    }

} 