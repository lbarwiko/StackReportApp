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
		requireLogin: passport.authenticate('localUsername', {session: false})
	}
}