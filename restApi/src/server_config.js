const dev_config = {
    prefix: 'dev',
    db:{
	    host: 'localhost', // 'localhost' is the default;
	    port: 5432, // 5432 is the default;
	    database: 'cloutwallet',
	    user: 'Luke',
	    password: 'password'
    },
    auth:{
        secret: '4CXzlStbG9OLDeRguS583Bqn1HZ2xpP7',
        jwtSession: {
            session: false
        },
        expiresIn: '60d', // Expires in Days
        saltRounds: 10
    },
    port:8080,
    sslport:4443
}

let data = dev_config;

const prefix         = data.prefix;
const db             = data.db;
const auth           = data.auth;
const port           = data.port;
const sslport        = data.sslport;

export default {prefix, db, auth, port, sslport};
