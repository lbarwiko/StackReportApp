// JWT strategy for Passport
import passport from 'passport';
import { Users } from '../../controllers';

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

export default (db, config) => {
    const User = Users(db, config);

    var tokenDeconstructor = function(req){
        /* We expect the request to come with a header titled 
            Authorization: 'Bearer <token>'
        */
        if(req){
            var auth_schemes = req.get('Authorization');
            if(auth_schemes){
                auth_schemes = auth_schemes.split(" ");
                if(auth_schemes.length === 2){ // 'Bearer ' + token OR 'jwt ' + token.
                    return auth_schemes[1];
                }
            }
        }
        return null;
    }

    const opts = {
        jwtFromRequest: tokenDeconstructor,
        secretOrKey: config.auth.secret
    }

    function isValid(payload){
        return payload.exp < Date.now()
    }

    const strategyUser = new JwtStrategy(opts, (payload, done) => {
        if(!isValid(payload)){
            return done(new Error("Expired Token"), {err: "Expired Token", code: 401});
        }

        User.getById(payload.user_id)
            .then(user=>{
                if(user['password']){
                    delete user.password;
                }
                return done(null, user);
            })
            .catch(err=> {
                return done( new Error("User not found"), {err: 'User not found'});
            })
    });

    return {
        user: strategyUser
    };
}