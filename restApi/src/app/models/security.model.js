// Security model

class Security{
    constructor(props){
        this.id = props.id;
        this.value = props.value;
        this.ticker = props.ticker;
        this.name = props.name;
    }

    toJSON(){
        return {
            value: this.value,
            ticker: this.ticker,
            name: this.name
        }
    }

    getValue(){
        return this.value;
    }
    getName(){
        return this.name;
    }
    getTicker(){
        return this.ticker;
    }
}

export default Security;