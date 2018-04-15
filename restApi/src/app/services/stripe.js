export default (db, config) =>{
    var stripe = require("stripe")(
        config.stripe.key
    );

    function charge(stripe_id){

    }
    
    return {
        charge: charge
    }
}