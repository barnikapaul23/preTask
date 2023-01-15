const express = require("express");
const authRouter = express.Router();
const userModel = require("../Models/userModel");
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {jwtkey}=require('../secret');

authRouter.route("/signup").get(getSignUp).post(postSignUp);
authRouter.route("/login").post(loginUser);

function middleware1(req, res, next) {
  console.log("middleware1 encountered");
  next();
}
function middleware2(req, res) {
  console.log("middleware2 encountered");
  console.log("middleware2 ended req/res cycle");
  res.sendFile("/public/index.html", { root: __dirname });
}
function getSignUp(req, res, next) {
  console.log("getSignUp called");
  next();
}
async function postSignUp(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj);
  //console.log('backend',user);
  res.json({
    message: "user signed up",
    data: user,
  });
}
async function loginUser(req, res) {
    try{
        let data = req.body;
        if (data.email){
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid=user['_id'];
                    let token=jwt.sign({payload:uid},jwtkey);
                    res.cookie('login',token,{httpOnly:true});
                    return res.json({
                        message: "User has been logged in",
                        userDetails: data,
                    });
                } else {
                    return res.json({
                        message: "Invalid"
                    });
                }
            } else {
                return res.json({
                    message: "User not found"
                });
            }
        }else{
            return res.json({
                message: "Please enter the email"
            });
        }
    } catch (error) {
        return res.json({
            message: error.message
        });
    }
}

module.exports = authRouter;