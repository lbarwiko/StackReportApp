//Authorizer Service
import passport from 'passport'


export default (config, db) => {
	return {
		init: ()=>{
			return passport.initialize();
		}
	}
}