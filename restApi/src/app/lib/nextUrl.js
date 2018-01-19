export default (req, page, size) => {
    var nextUrl = Url.parse(req.originalUrl).pathname;
	nextUrl += '?page=' + (page+1) + "&size=" + size;
    return nextUrl;
}