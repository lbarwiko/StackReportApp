import { NextUrl } from './index.js';

export default {
    BasicListRequest: (helper) => {
        return (req, res, next) => {
            var page = parseInt(req.param('page')) || 0;
            var size = parseInt(req.param('size')) || 10; 
            if(size <=0){
                return res.status(400).send("Invalid size");
            }
            if(page < 0){
                return res.status(400).send("Invalid page number");
            }
            helper(page, size)
                .then(data=>{
                    res.status(200).json({
                        data: data,
                        next: NextUrl(req, data, page, size)
                    });
                })
                .catch(err=>res.json(err));
        }
    }
}