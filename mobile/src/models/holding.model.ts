import {Security} from './security';

class HoldingMeta{
    security_id: string;
    num_shares: number;

    constructor(security_id, num_shares) {
        this.security_id = security_id;
        this.num_shares = num_shares;
    }

}

class Holding {
    security: Security;
    num_shares: number;
    percent_share: number;
    constructor(security, num_shares, id, name, current_price, volume_traded, price_history){
        this.num_shares = num_shares;
        if(security){
            this.security = security;
        }else{
            this.security = new Security(id, name, current_price, volume_traded, price_history);
        }
    }
    setPercent(percent){
        this.percent_share = percent;
    }
 } 

 export {
     HoldingMeta,
     Holding
 }