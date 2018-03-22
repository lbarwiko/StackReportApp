import { RestHelpers } from '../lib/';
import { Follow as FollowSql } from '../sql/';
import { Tier as TierController } from './index.js';

export default (db, config) => {
    const Tier = TierController(db, config);

    function list(){
        function helper(){

        }

        function rest(req, res, next){
            return res.json(true);
        }

        return {
            helper: helper,
            rest: rest
        }
    }
    

    function count(){
        function helper(user_id){
            return new Promise((resolve, reject)=>{
                console.log("in count")
                if(!user_id){
                    return reject({
                        err: 'No user_id provdied',
                        code: 400
                    });
                }
                console.log("user_id", user_id);
                db.one(FollowSql.count,{
                    user_id: user_id
                })
                .then(res=>{
                    console.log("count_res", res);
                    return resolve(res.count);
                })
                .catch(err=>reject(err));
            })
        }

        return {
            helper: helper
        }
    }

    function create(){
        function helper(user, fund){
            return new Promise((resolve, reject)=>{
                if(!user || !fund){
                    return reject({
                        err: 'No user_id or fund_id provided',
                        code: 400
                    });
                }
                var num_following = null;
                count().helper(user.user_id)
                .then(res=>{
                    num_following = res;
                    return Tier.get(user.tier)
                })
                .then(tierAllowed=>{
                    if(num_following >= tierAllowed.max_reports){
                        return Promise.reject({
                            code: 400,
                            err: 'Following too many reports'
                        })
                    }
                    console.log("You are able to follow");
                    return db.none(FollowSql.create,{
                        user_id: user.user_id,
                        fund_id: fund.fund_id
                    })
                })
                .then(res=>{
                    console.log("Did we follow?");
                    return resolve(true);
                })
                .catch(err=> {
                    if(err && err.code == "23505"){
                        return reject({
                            err: 'Already Following',
                            code: 409
                        })
                    }else{
                        return reject(err);
                    }
                });
            });
        }

        function rest(req, res, next){
            if(!req.user){
                return res.status(403).json({
                    err: 'Not authenticated',
                    code: 403
                });
            }
            if(!req.fund){
                return res.status(404).json({
                    err: 'Fund not found',
                    code: 404
                })
            }
            helper(req.user, req.fund)
            .then(result=>{
                return res.status(201).json({
                    message: "Successfully Followed Fund",
                    code: 201
                });
            })
            .catch(err=>res.json(err));

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
            res.send("hi");
        }

        return {
            helper: helper,
            rest: rest
        }
    }

    function remove(){
        function helper(user, fund){
            return db.none(FollowSql.delete,{
                user_id: user.user_id,
                fund_id: fund.fund_id
            })
            .then(result=>{
                console.log("removed");
                return Promise.resolve(true);
            })
            .catch(res=>{
                return Promise.reject(err);
            })

        }

        function rest(req, res, next){
            if(!req.user){
                return res.status(403).json({
                    err: 'Not authenticated',
                    code: 403
                });
            }
            if(!req.fund){
                return res.status(404).json({
                    err: 'Fund not found',
                    code: 404
                })
            }
            helper(req.user, req.fund)
            .then(result=>{
                return res.status(201).json({
                    message: "Successfully Deleted fund Fund",
                    code: 201
                });
            })
            .catch(err=>res.json(err));
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
            remove: remove().rest,
            list: list().rest
        },
        list: list().rest,
        get: get().helper,
        create: create().helper,
        remove: remove().helper
    }
}
