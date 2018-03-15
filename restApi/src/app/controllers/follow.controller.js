import { RestHelpers } from '../lib/';
import { Follow as FollowSql } from '../sql/';
import { Tier as TierController } from './index.js';

export default (db, config) => {
    const Tier = TierController(db, config);

    function list(req, res, next){
        return res.json(true);
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
                db.one(FollowSql.count,{
                    user_id: user_id
                })
                .then(res=>{
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
                    num_following;
                    return resolve(true);
                })
                .then(isGood=>{
                    return Promise.resolve(true);
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
            if(!req.fund){
                return res.status(404).json({
                    err: 'Fund not found',
                    code: 404
                })
            }
            helper(req.user, req.fund)
            .then(res=>{
                return res.status(201).json({
                    message: "Successfully Follwed Fund",
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
