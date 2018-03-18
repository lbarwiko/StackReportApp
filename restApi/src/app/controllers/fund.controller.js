import { Fund as FeedModel} from '../models/';
import { Fund as FundData} from '../data/';
import { Fund as FundSql} from '../sql/';
import { RestHelpers } from '../lib/';

import { Alphavantage } from '../services/';

export default (db, config) => {
    const AlphavantageApi = Alphavantage();

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
                .then(res=>{
                    return resolve(res);
                })
                .catch(err => reject(err));
            })
        }

        function param(req, res, next, fund_id){
            helper(fund_id)
            .then(fund=>{
                req.fund = fund;
                next();
            })
            .catch(err=>{
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
                    price_history: data
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
                db.none(FundSql.create, 
                    {
                        fund_id: payload.fund_id,
                        fund_name: payload.fund_name
                    }
                )
                .then(res => {
                    console.log("u good?");
                    return resolve(true);
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
            get: get().rest
        },
        list: list().helper,
        create: create().helper,
        get: get().helper
    }
}