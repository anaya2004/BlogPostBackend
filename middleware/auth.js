const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = async (req,res,next)=>{
    const token   = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status(401).json({error:'Empty token'});

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await user.findById(decode.id);
        next();
    }catch(err){
        res.status(500).json({error:'Invalid token'});
    }

}