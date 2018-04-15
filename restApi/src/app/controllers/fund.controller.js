import { Fund as FeedModel} from '../models/';
import { Fund as FundData} from '../data/';
import { Fund as FundSql, Holding as HoldingSql } from '../sql/';
import { RestHelpers } from '../lib/';

import { Alphavantage } from '../services/';

export default (db, config) => {
    const AlphavantageApi = Alphavantage();

    function upsert(){
        function rest(req, res, next){
            if(!req.fund){
                console.log("here");
                return create().rest(req, res, next);
            }else{
                return update().rest(req, res, next);
            }
        }
        return {
            rest: rest
        }
    }

    function update(){
        function helper(fund_id, payload){
            if(payload.accuracy){
                return db.none(FundSql.updateAccuracy,{
                    accuracy: payload.accuracy,
                    fund_id: fund_id
                })
            }
            //Delete holdings with fund_id first
            return db.none(HoldingSql.delete,{
                fund_id: fund_id
            })
            .then(res=>{
                //Then Update fund_id if there is a different name
                console.log("Deleted holdings");
                console.log("fund_name", fund_id);
                console.log("fund_name", payload.fund_name);
                return db.none(FundSql.update, {
                    fund_id: fund_id,
                    fund_name: payload.fund_name
                })
            })
            .then(res=>{
                console.log("Updated name");
                //Create new list of holdings
                return createHoldings(fund_id, payload.holdings)
            })
            .then(res=>{
                return Promise.resolve(true)
            })
            .catch(err=>Promise.reject(err));
        }

        function rest(req, res, next){
            if(!req.fund){
                return res.status(404).json({
                    code:404,
                    err: 'Fund not found'
                })
            }
            helper(req.fund.fund_id, req.body)
            .then(result=>{
                return res.status(201).json({
                    code:201,
                    message: 'Fund succesfully updated'
                })
            })
            .catch(err=>{
                return res.json(err);
            })
        }
        return{
            rest: rest,
            helper: helper
        }
    }

    function remove(){
        function helper(fund_id){
            return db.none(HoldingSql.delete,{
                fund_id: fund_id
            })
            .then(res=>{
                return db.none(FundSql.delete, {
                    fund_id: fund_id
                })
            })
            .then(res=>{
                return Promise.resolve(true);
            })
            .catch(err=>{
                return Promise.reject(err);
            })
        }
        function rest(req, res, next){
            if(!req.fund){
                return res.status(404).json({
                    code: 404,
                    err: 'No fund found'
                })
            }
            helper(req.fund.fund_id)
            .then(result=>{
                res.status(202).send("Deleted");
            })
            .catch(err=>res.json(err));
        }
        return {
            rest: rest,
            helper: helper
        }
    }

    function list(){
        function helper(page=0, size=10){
            return new Promise((resolve, reject)=>{
                db.any(FundSql.list,{
                    limit: size,
                    offset: page*size
                })
                .then(res=>{
                    return resolve(res);
                })
                .catch(err=>{
                    reject(err);
                });
            });
        }
        return {
            helper: helper,
            rest: RestHelpers.BasicListRequest(helper)
        }
    }

    function get(){
        function helper(fund_id){
            return new Promise((resolve, reject)=>{
                if(!fund_id){
                    return reject({
                        code: 400,
                        err: 'No fund_id provided'
                    })
                }
                db.one(FundSql.get,{
                    fund_id: fund_id
                })
                .then(fund=>{
                    console.log(fund);
                    db.any(HoldingSql.list,{
                        fund_id: fund_id
                    }).then(holdings=>{
                        fund['holdings'] = holdings;
                        return resolve(fund);
                    })
                    .catch(err=> reject(err));
                })
                .catch(err => {
                    if(err && err.code == 0){
                        return reject({
                            code: 404,
                            err: 'No fund found'
                        });
                    }else{
                        return reject(err);
                    }
                });
            })
        }

        function param(req, res, next, fund_id){
            helper(fund_id)
            .then(fund=>{
                req.fund = fund;
                next();
            })
            .catch(err=>{
                if(err && err.code == 404){
                    req.fund = null;
                    next();
                    return;
                }
                return res.json(err);
            })
        }

        function rest(req, res, next){
            if(!req.fund){
                return res.status(404).json({
                    code: 404,
                    err: 'No fund found'
                })
            }
            return AlphavantageApi.get(req.fund.fund_id)
            .then(data=>{
                return res.json({
                    fund_id: req.fund.fund_id,
                    fund_name: req.fund.fund_name,
                    accuracy: req.fund.accuracy,
                    holdings: req.fund.holdings,
                    price_history: data.price_history,
                    quote: data.quote,
                });
            })
            .catch(err=>{
                return res.status(500).json(req.fund);
            })
        }

        return {
            helper: helper,
            param: param,
            rest: rest
        }
    }

    function createHoldings(fund_id, holdings){
        if(!fund_id){
            return Promise.reject({
                err: 'No fund_id given',
                code: 404
            });
        }
        if(!holdings){
            return Promise.reject({
                err: 'No holdings given',
                code: 404
            });
        }
        return db.tx(t=>{
            var queries = [];
            holdings.forEach(holding=>{
                queries.push(
                    t.none(HoldingSql.create,{
                        fund_id: fund_id,
                        security_id: holding.security_id,
                        amount: holding.amount
                    })
                );
            });
            return t.batch(queries);
        })
    }

    function create(){
        /* 
            Create a Fund 
            Input: A fund_id and a fund_name
        */
		function helper(payload){
			return new Promise((resolve, reject)=>{
                console.log(payload);
                if( !payload || !payload.fund_id || !payload.fund_name
                ){
					return reject({
						err: 'Missing required Field.',
						code: 400
					})
                }
                db.one(FundSql.create, 
                    {
                        fund_id: payload.fund_id,
                        fund_name: payload.fund_name
                    }
                )
                .then(fundResponse => {
                    if(!fundResponse && !fundResponse.fund_id){
                        return reject({
                            err: 'Unable to insert',
                            code: 500
                        });
                    }
                    if(!payload.holdings){
                        return Promise.resolve(true);
                    }
                    var fund_id = fundResponse.fund_id;
                    return createHoldings(fund_id, payload.holdings)
                    
                })
                .then(res =>{
                    resolve(true);
                })
                .catch(err => {
                    console.log(err);
                    if(err && err.code == "23505"){
                        return reject({
                            err: 'Fund already in database',
                            code: 409
                        })
                    }else{
                        return reject(err);
                    }
                });
			})
        }

        function rest(req, res, next){
			return helper(req.body)
				.then(data => {
					if(data){
						res.status(201).json({message: 'Fund successfully created', code: 201});
					}else{
						res.status(400).json({err: 'Fund not created', code: 400});
					}
				})
				.catch(err => res.json(err));
		}
		return {
			rest: rest,
			helper: helper
		}
    }

    return {
        rest: {
            params:{
                fund_id: get().param
            },
            list: list().rest,
            create: create().rest,
            get: get().rest,
            remove: remove().rest,
            update: update().rest,
            upsert: upsert().rest
        },
        list: list().helper,
        create: create().helper,
        get: get().helper,
        update: update().helper
    }
}