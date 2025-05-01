//only for admins to create , update , get and delete users

const express = require('express');
const user = require('../models/user');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.get('/',auth,authorize('Admin'),async (req,res)=>{
    const users = await user.find();
    res.json(users);
})

router.post('/',auth,authorize('Admin'),async(req,res)=>{
    const {name,email,password,role} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await user.create({name,email,password:hashedPassword,role});
        res.status(200).json();
    }catch(err){
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.put('/:id',auth,authorize('Admin'),async (req,res)=>{
    const user = await user.findByIdAndUpdate(req.params.id,req.body);
    res.json(user);
})

router.delete('/:id' , auth , authorize('Admin') , async (req,res)=>{
    const user = await user.findByIdAndDelete(req.params.id);
    res.json();
})

module.exports = router;