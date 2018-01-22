import Url from 'url';

export default (req, data, page, size) => {
    if(!data || data.length == 0 || data.length < size){
        return "";
    }
	return Url.parse(req.originalUrl).pathname + '?page=' + (page+1) + "&size=" + size;
}