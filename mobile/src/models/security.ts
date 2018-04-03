class Security {
    id: string;
    name: string;
    current_price: number;
    volume_traded: number;
    price_history: any;

    constructor(id, name, current_price, volume_traded, price_history) {
    	//Required Params
        if(!price_history
        || !name
        || !id
        || !current_price
        || !volume_traded
         ){
           throw "Missing required field"; 
        }
        this.id = id;
        this.name = name;
        this.current_price = current_price;
        this.volume_traded = volume_traded;
        this.price_history = price_history;
    }
 } 
 class Fund extends Security{
    holdings: [Security];

    constructor(id, name, current_price, volume_traded, price_history) {
        super(id, name, current_price, volume_traded, price_history);
    }

    setHoldings(holdings){
        this.holdings = holdings;
    }
 } 

 class Stock extends Security {
     constructor(id, name, current_price, volume_traded, price_history) {
        super(id, name, current_price, volume_traded, price_history);
     }
 }

 export {
     Security,
     Fund,
     Stock
 }