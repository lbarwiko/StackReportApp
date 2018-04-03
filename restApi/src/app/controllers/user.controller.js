import bcrypt from 'bcrypt';

import { User as UserModel} from '../models/';
import { User as UserSql} from '../sql/';
import { RestHelpers } from '../lib/';
import { UsernameConstraint, PasswordConstraint } from '../constraints/';

export default (db, config) => {
    
    function updateTier(){
        function helper(){
            
        }
        function rest(){

        }
        return {
            helper: helper,
            rest, rest
        }
    }

    function updatePayment(){
        function helper(){

        }
        function rest(){

        }
        return {
            helper: helper,
            rest: rest,
        }
    }

    function create(){
        /* 
            Create a user 
            1) Check and make sure we have a valid username
            2) Hash the password ( AND SALT IT )
            3) Saved the user into the database
        */
		function helper(payload){
			return new Promise((resolve, reject)=>{
                if( ! payload || 
                    ! payload.username || 
                    ! payload.password
                ){
					return reject({
						err: 'Missing required Field.',
						code: 400
					})
                }
                UsernameConstraint(payload.username)
                .then(cleanUsername=>{
                    payload.username = cleanUsername;
                    return PasswordConstraint(payload.password);
                })
                .then(validPassword => {
                    return bcrypt.hash(validPassword, config.auth.saltRounds)
                })
				.then(hashedPassword =>{
                    return db.none(UserSql.create, 
                        {
                            username: payload.username,
                            password: hashedPassword
                        }
                    )
                })
                .then(res => {
                    // TODO: Return a token
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

    function getById(){
        /* Get a user by its ID 
            There isn't a direct rest request for this, since ID will be used
            as a REST url parameter.

            Parameters: 
                user_id: valid user_id for a user
                options: Allows you to decide if you expose the hashed password
                         or other potentially sensitive information.   
                    {
                        public: true/false
                    }
                    
        */
        function helper(user_id, options){
            return new Promise((resolve, reject)=>{
                var sql = UserSql.getById;
                if(options){
                    if(options.public){
                        sql = UserSql.getByIdPublic;
                    }
                }

                db.one(sql ,{
                    user_id: user_id
                })
                .then(res=> resolve(res))
                .catch(err=> reject({
                    err: 'No user found',
                    code: 404
                }));
            });
        }

        function param(req, res, next, user_id){
            /*  For the user param, we are going to assume this param are public user proiles
                That is why we always use the public option in options 
            */
            helper(user_id, {
                public: true
            })
            .then(user=>{
                req.user_param = user;
                next();
            })
            .catch(err=>{
                if(err && err.code === 404){
                    return res.status(404).json({
                        err: 'No user found with id ' + user_id,
                        code: 404
                    });
                }
                return res.json(err);
            })
        }

        return {
            helper: helper,
            param: param
        }
    }

    function getByUsername(){
        function helper(username, options){
            return new Promise((resolve, reject)=>{
                db.one(UserSql.getByUsername,{
                    username: username
                })
                .then(res=> resolve(res))
                .catch(err=> reject({
                    err: 'No user found',
                    code: 404
                }));
            });
        }
        function param(){
            // TODO: But may not be necessary. Very quick to implement though.
        }
        return {
            helper: helper
        }
    }

    function get(){
        /* Send the user param that we should have been given */
        function rest(req, res){
            var user = null;
            if(req.user_param){
                user = req.user_param;
            }else if(req.user){
                user = req.user;
            }
            if(!user){
                return res.status(400).json({
                    err: 'Bad request',
                    code: 400
                });
            }
            return res.json(user);
        }
        return {
            rest: rest
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
            params:{
                username: getByUsername().param,
                user_id: getById().param
            },
            list: list().rest,
            create: create().rest,
            get: get().rest
        },
        list: list().helper,
        create: create().helper,
        getByUsername: getByUsername().helper,
        getById: getById().helper
    }
}