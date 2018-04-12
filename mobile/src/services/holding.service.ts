import { Injectable } from '@angular/core';

import { Holding } from '../models/holding.model';

@Injectable()
export class HoldingService {
    holdingMetaToHolding(holding_metas, securities){
        // console.log("holdingService", holding_metas, securities);
        var holdings = [];
        for(var i=0; i<holding_metas.length; i++){
            // console.log("pushing", holding_metas[i], securities[i]);
            holdings.push(new Holding(securities[i], holding_metas[i].num_shares, null, null, null, null, null));
        }
        console.log("holdings returned", holdings);
        return holdings;
    }
} 