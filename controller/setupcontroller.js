module.exports = function(server , restify , plugins  , restifyValidator){ 

    // use handeler chain is executed after a route has been choosen to service a Request
    server.use(plugins.acceptParser(server.acceptable));                
    server.use(plugins.bodyParser());                               //  
    server.use(plugins.queryParser());                              //  
    server.use(restifyValidator);                                   // Restify Plugin                                   
    server.use(plugins.authorizationParser());                      // Autherization Plugin
    server.use(function(req,res,next){
         /*
            ip whitelisting additional  Implementation  for specific IP 
            
            var IpList = ['111.111.222.111'];
            var Ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            if(IpList.indexOf(ip)==-1){
                var response  = {
                        'status':'failure',
                        'data':'IP addressis blocked ..'
                    };
                    res.setHeader('content-type','application-json');
                    res.writeHead(403);                         //accept responce code 
                    res.end(JSON.stringify(response));             //creating json responce string
                    return  next();
                }      
                return next();
            }
            //need to pass 
            //Autorization : Basic Key 
            //X-Forwarded-For
        */
    });
    
    //Handles Request with API key 
    
    server.use(function(req,res,next){
        var apiKeys = {
            'user1': 'fdfdfdfdfergfgfg'                 // Assuming API key 
        };
        if(typeof(req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password != apiKeys[req.authorization.basic.username])
        {
            var response  = {
                'status':'failure',
                'data':'You must specify a valid key '
            };
            res.setHeader('content-type','application-json');
            res.writeHead(403);                         //accept responce code 
            res.end(JSON.stringify(response));             //creating json responce string
            return  next();
        }
        return next();

        // Upon Completion of Each function in the handler chan n , you are responsible for calling next()
        // . Calling next() will move to the next function in the chain
        // next() does not take any parameter
        // next(false) to stop any processing request
    });
    //Remove this if you want to use throttle 
    
    // Throttle is use when preventing multiple request Simultneously Only request/rate will accepted
    // server.use(plugins.throttle({
    //     rate:1,            // rate a request can pass
    //     burst:2,            // 
    //     xff:true        // X-Forwarded-For
    // }));
}
