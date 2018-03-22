import https from 'https';

export default ()=>{
    const dailyUrl = "https://www.alphavantage.co/query?apikey=V85COA4EHG4X1KJV&function=TIME_SERIES_DAILY";

    function get(){
        function helper(symbol){
            return new Promise((resolve, reject)=>{
                if(!symbol){
                    return reject({
                        code:404,
                        err: 'No symbol provided'
                    });
                }
                var url = dailyUrl + '&symbol=' + symbol;
                console.log("Getting url", url);
                https.get(url, res=>{
                    res.setEncoding("utf8");
                    let body = "";
                    res.on("data", data => {
                        body += data;
                    });
                    res.on("end", () => {
                        body = JSON.parse(body);
                        // var data = [];
                        // for(var key in body['Time Series (Daily)']){
                        //     var pricePoint = body['Time Series (Daily)'][key];
                        //     pricePoint['date'] = key;
                        //     data.push(pricePoint);
                        // }
                        // data = data.sort();
                        if(body['Error Message']){
                            return reject({
                                code: 500,
                                err: body['Error Message']
                            });
                        }
                        var output = Object.keys(body['Time Series (Daily)']).map(key => {
                            var pricePoint = body['Time Series (Daily)'][key];
                            pricePoint['date'] = key;
                            return pricePoint;
                        })
                        return resolve(output);
                    });
                });
            })
        }
        function rest(req, res, next){
            var symbol = req.param('symbol') || null;
            if(!symbol){
                return res.status(400).json({
                    err: 'No symbol provided',
                    code: 400
                })
            }
            helper(symbol)
            .then(data=>{
                return res.code(200).json(data);
            })
            .catch(err=>res.json(err));
        }
        return{
            helper:helper,
            rest: rest
        }
    }

    return {
        rest:{
            get: get().rest
        },
        get: get().helper
    }
}
