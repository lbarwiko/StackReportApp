import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EndpointService } from './endpoint.service';

@Injectable()
export class PredictionService {

    constructor(private http:Http, public endpointService: EndpointService) { 
    }
    

}
