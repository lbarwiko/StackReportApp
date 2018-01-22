import { Fund as FeedModel} from '../models/';
import { Fund as FundData} from '../data/';
import { RestHelpers } from '../lib/';

export default (db, config) => {
    
    function list(){
        function helper(page=0, size=10){
            return new Promise((resolve, reject)=>{
                resolve([
                    FundData
                ]);
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