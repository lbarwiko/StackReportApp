import { RestHelpers } from '../lib/';

export default (db, config) => {
    function list(req, res, next){
        return res.json(true);
    }
    return {
        list: list
    }
}
