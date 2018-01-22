// Holding Model
import Security from './index.js';


class Holding{
    constructor(props){
        this.security = props.security;
        this.amount = props.amount;
        this.id = props.id;
    }

    toJSON(){
        return {
            id: this.id,
            security: this.security,
            amount: this.amount
        }
    }

    getValue(){
        return this.security.getValue() * this.amount;
    }
    getSecurity(){
        return this.security;
    }
}

export default Holding;