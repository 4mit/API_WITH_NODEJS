function _respond(res, next ,status ,data ,http_code){
    var response = {
        'status' : status,
        'data'  : data
    }
    res.setHeader('content-type','application-json');
    res.writeHead(http_code);                         //accept responce code 
    res.end(JSON.stringify(response));             //creating json responce string
    return  next();
}

module.exports.success  = function success(res , next , data){
    _respond(res , next , 'success' , data ,200);
}

module.exports.failure = function failure(res ,next ,data, http_code){
    _respond(res , next ,'failure', data , http_code);
}