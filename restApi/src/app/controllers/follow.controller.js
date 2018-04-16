import { RestHelpers } from '../lib/';
import { Follow as FollowSql } from '../sql/';
import { Tier as TierController } from './index.js';

export default (db, config) => {
    const Tier = TierController(db, config);

    function listDefault(){
        function helper(){
            return db.any(FollowSql.default)
            .then(res=>{
                var results = [];
                res.forEach(fund_id_obj=>{
                    results.push(fund_id_obj.fund_id);
                })
                return Promise.resolve(results);
            })
            .catch(err=>Promise.reject(err));
        }
        function rest(req, res, next){
            helper()
            .then(data=>{
                res.json(data);
            })
            .catch(err=>res.json(err));
        }
        return {
            helper: helper,
            rest: rest
        }
    }

    function followDefault(){
        function helper(user){
            console.log("in follow default");
            return listDefault().helper()
            .then(default_list=>{
                var promises = [];
                default_list.forEach(default_fund=>{
                    promises.push(
                        create().helper(user, {fund_id: default_fund})
                    );
                });
                return Promise.all(promises)
            })
            .then(success=>{
                if(success){
                    return Promise.resolve(true);
                }else{
                    return Promise.reject({
                        err:'Did not follow default funds',
                        code: 400
                    });
                }
            })
            .catch(err=>Promise.reject(err));
        }

        function rest(req, res, next){
            if(!req.user){
                return res.status(403).json({
                    err: 'No user provided',
                    code: 403
                });
            }
            helper(req.user)
            .then(data=>{
                console.log("Followed default");
                next();
            })
            .catch(err=>res.json(err));
        }

        return {
            helper: helper,
            rest: rest
        }
    }

    function list(){
        function helper(user){
            return db.any(FollowSql.list,{
                user_id: user.user_id
            })
            .then(res=>{
                return Promise.resolve(res);
            })
            .catch(err=>{
                return Promise.reject(err);
            })
        }

        function rest(req, res, next){
            if(!req.user){
                return res.status(403).json({
                    code: 403,
                    error: 'Unauthorized'
                });
            }

            helper(req.user)
            .then(results=>{
                return res.status(200).json(results);
            })
            .catch(err=>{
                if(err && err.code){
                    return res.status(err.code).json(err);
                }else{
                    res.json(err);
                }
            })
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
                    //console.log("count_res", res);
                    return resolve(res.count);
                })
                .catch(err=>reject(err));
            })
        }

        function rest(req, res, next){
            if(!req.user){
                return res.status(403).json({
                    err:'Not authorized',
                    code: 403
                });
            }
            helper(req.user.user_id)
            .then(data=>{
                res.json(data);
            })
            .catch(err=>res.json(err));
        }

        return {
            helper: helper,
            rest: rest
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

    function verify(){
        /* Checks if a user is following a fund */
        function helper(user, fund){
            return db.one(FollowSql.verify,{
                user_id: user.user_id,
                fund_id: fund.fund_id
            })
            .then(result=>{
                return Promise.resolve(result);
            })
            .catch(err=>{
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
                return res.json(result);
            })
            .catch(err=> res.json(err));
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
            verify: verify().rest,
            create: create().rest,
            remove: remove().rest,
            list: list().rest,
            count: count().rest,
            default: listDefault().rest,
            followDefault: followDefault().rest
        },
        list: list().rest,
        verify: verify().helper,
        create: create().helper,
        remove: remove().helper,
        count: count().helper,
        default: listDefault().helper,
        followDefault: followDefault().helper
    }
}
