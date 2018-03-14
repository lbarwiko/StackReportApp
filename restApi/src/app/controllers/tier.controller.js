import { Tier as TierSql } from '../sql/';

export default (db, config) => {
    function get(){
        function helper(tier_type){
            return new Promise((resolve, reject)=>{
                if(!tier_type){
                    return reject({
                        code: 400,
                        err: 'No fund_id provided'
                    })
                }
                db.one(TierSql.get,{
                    tier_type: tier_type
                })
                .then(res=>{
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