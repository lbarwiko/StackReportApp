import { Alphavantage } from '../services/';

export default (db, config) => {
    const AlphavantageApi = Alphavantage();

    function get(){
        function rest(req, res, next){
            var security_ids = req.params.security_id;
            if(!security_ids){
                if(req.param('symbols')){
                    var unparsed_symbols = req.param('symbols');
                    security_ids = unparsed_symbols.split(',');
                    console.log(security_ids);
                }else{
                    return res.json({
                        code: 404,
                        err: 'No security_id provided'
                    });
                }
            }
            return AlphavantageApi.get(security_ids, req.param('news'))
            .then(data=>{
                return res.status(200).json(data);
            })
            .catch(err=>{
                console.log(err);
                return res.status(err.code).json(err);
            });
        }
        return {
            rest: rest
        }
    }

    return {
        rest:{
            get: get().rest
        }
    }
}