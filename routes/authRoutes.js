const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.post('/register',async(req,res)=>{
    const {name , email,password,role} = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        console.log("I am in register");
        const userReg = await user.save({name,email,password:hashedPassword,role});
        res.status(201).json({message:'User registered successfully'}, userReg);
    }catch(err){
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await user.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).json({error:'Invalid Credentials'});
    }

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET);
    res.json({token});
})

module.exports  = router;   