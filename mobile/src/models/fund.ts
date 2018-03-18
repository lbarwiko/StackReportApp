export class Fund {
    fund_id: string;
    fund_name: string;
    current_value: number;
    liabilities: number;
    stocks: [string];

    constructor(fund_id_in) {
    	//Required Params
        if(!fund_id_in || fund_id_in == null){
           throw "Missing required field"; 
        }
        this.fund_id = fund_id_in;
        this.fund_name = "fund_name";
    }
 } 