const express = require("express");
const { UserModal } = require("../models/authModal");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoute.post("/register", async (req,res) => {
    const {username,avatar,email,password} = req.body;

    const user = await UserModal.find({email});

    if(user.length>0){
        res.status(400).send({"msg":"User already exists"});
    }else{
        try {
            bcrypt.hash(password, 5,async (err, hash) => {
               const user = await new UserModal({username,avatar,email,password : hash});
               user.save();
               res.status(200).send({"msg":"user registered successfully"});
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({"msg":"error occured"});
        }
    }
})

userRoute.post("/login",async (req,res) => {
    const {password,email} = req.body;
    try {
        const user = await UserModal.find({email});
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, async (err, result) => {
               if(result){
                res.status(200).send({"msg":"user logined successfully","token":jwt.sign({userID: user[0]._id},"subodh")});
               }else{
                res.status(400).send({"msg":"login Failed"});
               }
            });
        }else{
            res.status(400).send({"msg":"login Failed"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"error occured"});
    }
})

module.exports = {userRoute};