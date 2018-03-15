export default class Fund {
    fund_id: number;
    fund_name: string;
    // current_value: number;
    // liabilities: number;
    // stocks: [string];
    constructor() {
    	//Required Params
        if(!params || params.fund_id == null || params.fund_name == null){
           throw "Missing required field"; 
        }
        this.fund_id = params.fund_id;
        this.fund_name = params.fund_name;
    }
 } 