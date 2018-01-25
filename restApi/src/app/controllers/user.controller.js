import { User as UserModel} from '../models/';
import { User as UserSql} from '../sql/';
import { RestHelpers } from '../lib/';

export default (db, config) => {
    
    function create(){
		function helper(payload){
			return new Promise((resolve, reject)=>{
				if(!payload || !payload.username){
					return reject({
						err: 'Bad Request',
						code: 400
					})
				}
				
				db.none("INSERT INTO USERS(username) VALUES (${username})", 
                    {
                        username: payload.username
                    }
                )
                .then(res => {
                    console.log("INSERTING USER");
                    return resolve(true);
                })
                .catch(err => {
                    if(err && err.code == "23505"){
                        reject({
                            err: 'Username already taken',
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
						res.status(201).json({message: 'User successfully created', code: 201});
					}else{
						res.status(400).json({err: 'User not created', code: 400});
					}
				})
				.catch(err => res.json(err));
		}
		return {
			rest: rest,
			helper: helper
		}
    }

    function list(){
        function helper(page=0, size=10){
            return new Promise((resolve, reject)=>{
                db.any(UserSql.list,{
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

    return {
        rest: {
            list: list().rest,
            create: create().rest
        },
        list: list().helper,
        create: create().helper
    }
}