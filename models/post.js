const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    tags : [String],
    status : {type : String , enum : ['Public','Private'],default:'Public'}
});

module.exports = mongoose.model('post',postSchema);