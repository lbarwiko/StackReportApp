import { RestHelpers } from '../lib/';
import { Follow as FollowSql } from '../sql/';

export default (db, config) => {
    
    function list(req, res, next){
        return res.json(true);
    }

    function create(){
        function helper(user_id, fund_id){
            return new Promise((resolve, reject)=>{
                if(!user_id || !fund_id){
                    return reject({
                        err: 'No user_id or fund_id provided',
                        code: 400
                    });
                }
                db.none(FollowSql.create, {
                    user_id: user_id,
                    fund_id: fund_id
                })
                .then(res=>{
                    return resolve(true);
                })
                .catch(err=> reject(err));
            })
        }

        function rest(req, res, next){
            if(!req.user){
                return res.status(403).json({
                    err: 'Not authenticated',
                    code: 403
                });
            }
            
        }

        return {
            helper: helper,
            rest: rest
        }
    }

    function get(){
        function helper(){

        }

        function rest(req, res, next){

        }

        return {
            helper: helper,
            rest: rest
        }
    }

    function remove(){
        function helper(){

        }

        function rest(req, res, next){

        }

        return {
            helper: helper,
            rest: rest
        }
    }
    return {
        rest:{
            get: get().rest,
            create: create().rest,
            remove: remove().rest
        },
        list: list,
        get: get().helper,
        create: create().helper,
        remove: remove().helper
    }
}
