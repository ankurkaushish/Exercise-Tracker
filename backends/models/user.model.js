const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
//create Schema

const userSchema = new Schema({
    username :{
        type : String ,
         required : true ,
         unique : true ,
          trim :true ,
          minlength :3
    } },
    
    {
        timestamps : true
    }
);

module.exports = User = mongoose.model('User' , userSchema);