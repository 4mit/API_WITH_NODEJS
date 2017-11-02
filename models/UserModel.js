var mongoose = require('mongoose');     // Importing mongoose package 

var Schema = mongoose.Schema,           // schema Objects
ObjectId = Schema.ObjectId;

var UserModel = mongoose.model('user', new Schema({   
    id        : ObjectId,
    first_name     : String,
    last_name      : String,
    email_address : String,
    career         : String 
}));

module.exports = UserModel;