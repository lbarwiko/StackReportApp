const dist_config = {
    prefix: 'dist',
    db:{
	    host: 'localhost', // 'localhost' is the default;
	    port: 5432, // 5432 is the default;
	    database: 'stackreport',
    },
    auth:{
        secret: '4CXzlStbG9OLDeRguS583Bqn1HZ2xpP7'
    },
    port:80,
    sslport:443
}

let data = dist_config;
