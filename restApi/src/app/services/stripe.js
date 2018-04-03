export default (db, config) =>{
    var stripe = require("stripe")(
        config.stripe.key
    );
    
}