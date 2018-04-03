import https from 'https';

export default ()=>{
    const iexUrl = "https://api.iextrading.com/1.0/";
    
    function get(){
        function helper(symbols, news){
            return new Promise((resolve, reject)=>{
                if(!symbols){
                    return reject({
                        code: 404,
                        err: 'No symbol provided'
                    });
                }
                var url = iexUrl + 'stock/market/batch?symbols='
                if(Array.isArray(symbols)){
                    symbols.forEach(symbol=>{
                        url += symbol + ',';
                    });
                }else{
                    url += symbols;
                }
                url += '&types=quote,chart';
                if(news){
                    url += ',news';
                }

                https.get(url, res=>{
                    res.setEncoding("utf8");
                    let body = "";
                    res.on("data", data => {
                        body += data;
                    });

                    res.on("end", () => {
                        if(body == 'Not Found'){
                            return reject({
                                code: 404,
                                err: symbols + ' not found'
                            })
                        }
                        body = JSON.parse(body);
                        var dataToReturn = [];
                        for(var security_symbol in body){
                            var security = body[security_symbol];
                            dataToReturn.push({
                                security_name: security.quote.companyName,
                                security_id: security.quote.symbol,
                                quote: security.quote,
                                price_history: security.chart,
                                news: security.news || null
                            })
                        }
                        if(dataToReturn.length == 1){
                            dataToReturn = dataToReturn[0];
                        }
                        return resolve(dataToReturn);
                    });
                });
            });
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
