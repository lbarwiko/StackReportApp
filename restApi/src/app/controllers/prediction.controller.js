import { Prediction as PredictionSql, PredictionMeta as PredictionMetaSql } from '../sql/';
import { RestHelpers, NextUrl } from '../lib/';

export default (db, config) => {

    function list(){
        function helper(fund_id, page=0, size=1){
            return new Promise((resolve, reject)=>{
                var requestSql = PredictionMetaSql.get;
                if(!fund_id){
                    requestSql = PredictionMetaSql.list;
                }
                db.any(requestSql,{
                    fund_id: fund_id,
                    limit: size,
                    offset: page*size
                })
                .then(prediction_metas=>{
                    var predictionPromises = [];
                    prediction_metas.forEach(prediction_meta=>{
                        predictionPromises.push(
                            new Promise((resolve2, reject2)=>{
                                return db.any(PredictionSql.list,{
                                    prediction_meta_id: prediction_meta.prediction_meta_id
                                })
                                .then(res=>{
                                    return resolve2(res)
                                })
                                .catch(err=>{
                                    return reject2(err);
                                })
                            })
                        )
                    })

                    return Promise.all(predictionPromises)
                    .then(predictions=>{
                        return new Promise((resolve3)=>{
                            var response = [];
                            var i = 0;
                            predictions.forEach(prediction=>{
                                //Find correct prediction meta
                                response.push({
                                    meta: prediction_metas[i],
                                    prediction: prediction
                                });
                                i+=1;
                            })
                            return resolve3(response);
                        });
                    })
                    .catch(err=>{
                        return reject(err);
                    })
                })
                .then(res=>{
                    return resolve(res);
                })
                .catch(err=>{
                    reject(err);
                });
            });
        }

        function rest(req, res, next){
            var page = parseInt(req.param('page')) || 0;
            var size = parseInt(req.param('size')) || 1; 
            if(size <=0){
                return res.status(400).send("Invalid size");
            }
            if(page < 0){
                return res.status(400).send("Invalid page number");
            }
            var fund_id = null;
            if(req.fund){
                fund_id = req.fund.fund_id;
            }

            helper(fund_id, page, size)
                .then(data=>{
                    res.status(200).json({
                        data: data,
                        next: NextUrl(req, data, page, size)
                    });
                })
                .catch(err=>res.json(err));
        }
        return {
            helper: helper,
            rest: rest
        }
    }


    function create(){
        /* 
            Create a Prediction 
            Input: A fund_id and an array of securities that are predicted
        */
		function helper(payload){
			return new Promise((resolve, reject)=>{
                
                if( !payload || !payload.fund_id || !payload.securities
                ){
					return reject({
						err: 'Missing required Field.',
						code: 400
					})
                }
                console.log(payload);
                return db.one(PredictionMetaSql.create,{
                    fund_id: payload.fund_id
                })
                .then(predictionMetaResponse =>{
                    if(!predictionMetaResponse && !predictionMetaResponse.prediction_meta_id){
                        return reject({
                            err: 'Unable to insert',
                            code: 500
                        });
                    }
                    var prediction_meta_id = predictionMetaResponse.prediction_meta_id
                    return db.tx(t => {
                        var queries = [];
                        
                        payload.securities.forEach(security => {
                            console.log(security);
                            queries.push(
                                t.none(PredictionSql.create, {
                                    prediction_meta_id: prediction_meta_id,
                                    security_id: security.security_id,
                                    order_type: security.order_type,
                                    amount: security.amount
                                })
                            );
                        });
                        return t.batch(queries);
                    })
                })
                .then(res => {
                    return resolve(true);
                })
                .catch(err => {
                    if(err && err.code == "23505"){
                        reject({
                            err: 'Prediction already in database',
                            code: 409
                        })
                    }else{
                        reject(err);
                    }
                });
			})
        }

        function rest(req, res, next){
			helper(req.body)
				.then(data => {
					if(data){
						res.status(201).json({message: 'Prediction successfully created', code: 201});
					}else{
						res.status(400).json({err: 'Prediction not created', code: 400});
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
            list: list().rest,
            create: create().rest
        },
        list: list().helper,
        create: create().helper
    }
}