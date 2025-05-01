const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : {type:String , unique:true},
    password : String,
    role : {type : String , enum : ['Admin','Author','Reader'],default:'Reader'}
});

module.exports = mongoose.model('user',userSchema);