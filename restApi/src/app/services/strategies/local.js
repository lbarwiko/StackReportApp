// Local Passport Strategy Definition
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Users } from '../../controllers';

var LocalStrategy = require('passport-local').Strategy;

export default (db, config) => {
    const User = Users(db, config);

    function createToken(user){
        //console.log("Creating token for user", user);
        var payload = {
            user_id: user.user_id,
        }
        //console.log(config);
        return new Promise((resolve, reject) => {
            var token = jwt.sign(payload, config.auth.secret, {
                expiresIn: config.auth.expiresIn //Days to minutes
            }, (err, token) => {
                if(err){
                    reject(err);
                }
                user['token'] = 'bearer ' + token;

                if(user['password']){
                    delete user.password;
                }

                resolve(user);
            })
        });
    }

    function testCompare(){
        return new Promise(resolve => { resolve(true)});
    }

    const strategyUsername = new LocalStrategy(
        {usernameField: 'username', passwordField: 'password'}, 
        (username, password, done) => {
            User.getByUsername(username.toLowerCase())
                .then((user)=>{
                    // Check if the password matches the hash
                    return bcrypt.compare(password, user.password)
                    //return testCompare()
                        .then(res => {
                            // If the password is wrong return false, else create a jwt
                            if(!res){
                                return done(null, false, { err: 'Invalid username or password', code: 401});
                            }
                            return createToken(user)
                            .then(userWithToken=>{
                                return done(userWithToken);
                            })
                        }, err => { 
                            return done(null, false, { err: 'Error validating login', code: 401}) 
                        })
                }, err => {
                    // Were not able to find a matching user_id
                    return done(null, false)
                }) 
                .then(user => {
                    // We created a valid token and attached it to the user. We're done.
                    return done(null, user);
                }, err => {
                    return done(err, false, {err: 'Error creating token', code:500})
                })
                .catch(err => {
                    return done(err);
                })
    });

    return {
        username: strategyUsername,
    }
}