import { Prediction as PredictionSql } from '../sql/';
import { RestHelpers } from '../lib/';

export default (db, config) => {
    
    function list(){
        function helper(page=0, size=10){
            return new Promise((resolve, reject)=>{
                db.any(PredictionSql.list,{
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


    function create(){
        /* 
            Create a Fund 
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
                return db.tx(t => {
                    var queries = [];
                    payload.securities.forEach(security_id => {
                        queries.push(
                            t.none(PredictionSql.create, {
                                fund_id: payload.fund_id,
                                security_id: security_id
                            })
                        );
                    });
                    return t.batch(queries);
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