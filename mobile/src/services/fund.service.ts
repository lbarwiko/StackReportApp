import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import EndpointsService from './endpoints.service';
// import { Fund } from '../models/fund';

@Injectable()
export class FundService {
    // url = ApiEndpoint.base + ApiEndpoint.fund;
    
    // constructor(private http:Http) { }

    // getFund(fund_id:String): Promise<Fund> {
    //     return new Promise((resolve, reject)=>{
    //         let options = new RequestOptions({
    //             params: {
    //                 page: page,
    //                 size: size
    //               }
    //         })
    //         console.log("this.url");
    //         console.log(this.url);
    //         this.http.get(this.url, options).toPromise()
    //         .then(res=>{
    //             return resolve(this.extractData(res))
    //         })
    //         .catch(this.handleErrorPromise);
    //     })
    // } 

    // private extractData(res: Response) {
    //     let body = res.json();
    //     return body.data;
    // }
} 