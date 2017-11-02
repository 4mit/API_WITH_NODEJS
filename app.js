 var restify = require('restify');                   //Importing restify 
 var plugins = require('restify-plugins')            //Restify plugins 
 var server = restify.createServer();                // creating server
 var setupcontroller  = require('./controller/setupcontroller'); // setupcotroller.js
 var userController  = require('./controller/userController');   // UserController.js
 var restifyValidator = require('restify-validator');        //restify validator 
 var mongoose = require('mongoose');                 //importing mongoose database 

 mongoose.connect('mongodb://127.0.0.1/users'); // Connect To localhost 

 setupcontroller(server , restify , plugins , restifyValidator);
 userController(server);

 server.listen(8080  , function(){              //Starting the server 
     console.log('%s Listening at %s', server.name  , server.url);
 });
