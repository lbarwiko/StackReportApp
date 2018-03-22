import { Alphavantage } from '../services/';

export default (db, config) => {
    const AlphavantageApi = Alphavantage();

    function get(){
        function rest(req, res, next){
            var security_id = req.params.security_id;
            if(!security_id){
                return res.json({
                    code: 404,
                    err: 'No security_id provided'
                });
            }
            return AlphavantageApi.get(security_id)
            .then(data=>{
                return res.json({
                    security_id: security_id,
                    price_history: data
                });
            })
            .catch(err=>{
                return res.status(500).json({
                    err: 'Alphavantage sucked. Not our fault.',
                    code: 500
                });
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