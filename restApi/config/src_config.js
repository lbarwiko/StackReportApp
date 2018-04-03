const dev_config = {
    prefix: 'src',
    db:{
	    host: 'localhost', // 'localhost' is the default;
	    port: 5432, // 5432 is the default;
	    database: 'stackreport',
    },
    auth:{
        secret: 'lkas3l2kj42l3k4jamq22114',
        jwtSession: {
            session: false
        },
        expiresIn: '90d', // Expires in Days
        saltRounds: 10
    },
    port:8080,
    sslport:4443,
    stripe: {
        key: 'sk_test_Ell1lUxLTqJcLuQWWWCMXXdd'
    }
}

let data = dev_config;
