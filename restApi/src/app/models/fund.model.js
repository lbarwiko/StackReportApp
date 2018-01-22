// Fund model
// NOT FINAL AT ALL. 

class Fund{
    constructor(props){
        this.holdings = props.holdings;
        this.name = props.name;
        this.id = props.id;
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            holdings: this.holdings
        }
    }

    getHoldings(){
        return this.holdings;
    }
    getName(){
        return this.name;
    }
}

export default Fund;