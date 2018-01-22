const dev_config = {
    prefix: 'src',
    db:{
	    host: 'localhost', // 'localhost' is the default;
	    port: 5432, // 5432 is the default;
	    database: 'stackreport',
    },
    auth:{
        secret: '',
        jwtSession: {
            session: false
        },
        expiresIn: '', // Expires in Days
        saltRounds: 10
    },
    port:8080,
    sslport:4443
}

let data = dev_config;
