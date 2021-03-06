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
    holdings: [any];

    constructor(id, name, current_price, volume_traded, price_history, holdings) {
        super(id, name, current_price, volume_traded, price_history);
        this.holdings = holdings;
    }

    setHoldings(holdings){
        var totalPrice = 0;
		holdings.forEach(holding=>{
            totalPrice += holding.security.current_price * holding.num_shares;
        });
        holdings.forEach(holding=>{
            holding.setPercent(holding.num_shares * holding.security.current_price / totalPrice * 100);
        });
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