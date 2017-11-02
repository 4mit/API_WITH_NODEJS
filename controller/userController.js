 var helper = require('../config/helperfunction.js');
 var UserModel = require('../models/UserModel.js');
 
 module.exports = function(server){
    server.get("/",function(req,res,next){
        UserModel.find({},function(err,users){
            helper.success(res,next,users);
        });
    });
    
    server.get("/user/:id",function(req,res,next){
        req.assert('id','id should be numeric').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            helper.failure(res , next , errors[0],400);
        }
        UserModel.findOne({_id : req.params.id},function(err,user){
            if(err){
                helper.failure(res , next , 'Cant fetch database .. ', 50);
            }
            if(user === null){
                helper.failure(res , next , 'Cant find specified the given user .. ', 404);
            }
            helper.success(res,next,user);
        });
    });
    
    server.post("/user",function(req,res,next){
        req.assert('first_name' , 'First Name is required .. ').notEmpty();
        req.assert('last_name' , 'Last Name is required .. ').notEmpty();
        req.assert('email_address' , 'Email  is required ..and should be correct ').notEmpty().isEmail();
        req.assert('career' , 'fil valid career  ').isIn(['student' , 'professor' , 'teacher']);
        var errors = req.validationErrors();
        if(errors){
            helper.failure(res , next , errors , 400);
        }
        var user = new UserModel();
        user.first_name  = req.params.first_name;                      //array of parameter
        user.last_name   = req.params.last_name;
        user.email_address = req.params.email_address;
        user.career =  req.params.career;
        user.save(function(err){
            helper.failure(res , next , 'Error Connecting database', 500);
        }); 
        helper.success(res,next,user);
    });
       
    server.put("/user/:id",function(req,res,next){       
        if(typeof(users[req.params.id]) === 'undefined'){
            helper.failure(res , next , 'Cant update user ' , 404);
        }
        var user = users[parseInt(req.params.id)];                      //array of parameter
        var updates = req.params;
        for(var field in updates){
            user[field] = updates[field];
        }                                           //assingning userId of users
        helper.success(res,next,user);
    });
    
    server.del("/user/:id",function(req,res,next){
        if(typeof(users[req.params.id]) === 'undefined'){
            helper.failure(res , next , 'Cant update user ' , 404);
        }   
        delete users[parseInt(req.params.id)];                                //assingning userId of users
        helper.success(res,next,[]);
    });    
}