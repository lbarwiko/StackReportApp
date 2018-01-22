import { User as UserModel} from '../models/';
import { User as UserSql} from '../sql/';
import { RestHelpers } from '../lib/';

export default (db, config) => {
    
    function list(){
        function helper(page=0, size=10){
            return new Promise((resolve, reject)=>{
                db.any(UserSql.list,{
                    limit: size,
                    offset: page*size
                })
                .then(res=>{
                    return resolve(res);
                })
                .catch(err=>{
                    reject(err);
                });
            });
        }
        return {
            helper: helper,
            rest: RestHelpers.BasicListRequest(helper)
        }
    }

    return {
        rest: {
            list: list().rest
        },
        list: list().helper
    }
}