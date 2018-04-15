//Authorizer Service
import passport from 'passport'
import jwtStrategy from './strategies/jwt.js';
import localStrategy from './strategies/local.js';

export default (db, config) => {
	const local = localStrategy(db, config);
	const jwt = jwtStrategy(db, config);
	passport.use('localUsername', local.username);
	passport.use('jwtUser', jwt.user);

	function handleResponse(err, user, info){
		if(user){
			res.json(user);
		}
	}
	
	return {
		init: ()=>{
			return passport.initialize();
		},
		requireToken: passport.authenticate('jwtUser', { session: false }),
		requireLogin: (req, res, next)=>{
			passport.authenticate('localUsername', (err, user, info)=>{
				console.log("in1");
				if(user){
					console.log("in2");
					return next(user);
				}else if(err){
					console.log("in3");
					return res.json(err);
				}else if(info){
					console.log("info");
					return res.json(info)
				}else{
					return res.json({
						err: 'Internal Server Error',
						code: 500
					})
				}
			}, {session: false})(req, res, next);
		}
	}
}