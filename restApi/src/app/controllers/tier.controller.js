import { Tier as TierSql } from '../sql/';

export default (db, config) => {
    var cache = {};

    function get(){
        function helper(tier_type){
            console.log("In Tier Helper");
            if(tier_type && cache[tier_type]){
                console.log("Was cached");
                return Promise.resolve(cache[tier_type]);
            }

            return new Promise((resolve, reject)=>{
                if(!tier_type){
                    return reject({
                        code: 400,
                        err: 'No tier_type provided'
                    })
                }
                db.one(TierSql.get,{
                    tier_type: tier_type
                })
                .then(res=>{
                    cache[tier_type] = res;
                    return resolve(res);
                })
                .catch(err => reject(err));
            })
        }
        return {
            helper: helper,
        }
    }

    return {
        get: get().helper
    }
}