import { User as UserModel} from '../models/';
import { User as UserSql} from '../sql/';
import { NextUrl } from '../lib/';


export default (db, config) => {
    
    function list(){
        function helper(page=0, size=10){
            return new Promise((resolve, reject)=>{
                db.any(UserSql.list,{
                    limit: size,
                    offset: page*size
                })
                .then(res=>{
                    resolve(res);
                })
                .catch(err=>reject(err));
            });
        }

        function rest(req, res, next){
            var page = parseInt(req.param('page')) || 0;
			var size = parseInt(req.param('size')) || 10; 
            if(size <=0){
				return res.status(400).send("Invalid size");
			}
			if(page < 0){
				return res.status(400).send("Invalid page number");
			}
            helper(page, size)
            .then(res=>{
                var next_url = NextUrl(req, page, size);
                if(!res || res.length== 0){
                    next_url = "";
                }
                res.json({
                    data: res,
                    next: next_url
                });
            })
            .catch(err=>res.json(err));
        }

        return {
            helper: helper,
            rest: rest
        }
    }

    return {
        rest: {
            list: list().rest
        },
        list: list().helper
    }
}