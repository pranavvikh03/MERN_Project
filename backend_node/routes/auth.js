const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const jwttoken = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();
const JWT_TOKEN = "Abc@123"

router.post("/",[
    body('name','Enter Valid Username').isLength({ min : 3 }),
    body('email','Enter Valid Email').isEmail(),
    body('password','Enter Valid Password').isLength({ min : 5 })
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try
    {
        let us = await User.findOne({email: req.body.email})
        if(us)
        {
            return res.status(400).json({error: "User with same email exists already"})
        }
        let salt = await bcrypt.genSalt(10)
        let secPass = await bcrypt.hash(req.body.password,salt)
        const nuser = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass
        });
        res.status(200).json({msg:"Data Added Successfully !"});
    }
    catch(err)
    {
        res.status(500).send("Problem Occured");
    }
});

router.post("/login",[
    body('username','Enter Valid Username').isEmail(),
    body('password','Enter Password').exists()
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({"Errors":errors.array()})
    }
    try
    {
        let user = await User.findOne({email:req.body.username})
        if(!user)
        {
            return res.status(400).send("Enter Valid Credentials")
        }
        let comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword)
        {
            return res.status(400).send("Enter Valid Credentials")
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwttoken.sign(data,JWT_TOKEN)
        return res.status(200).json({"msg":"Login Succesfull !!","authtoken":authtoken})
    }
    catch(err)
    {
        return res.status(500).send("Internal Server Error");
    }
});

router.post("/getUser", fetchuser, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("Error in fetching user data")
    }
})


module.exports = router;