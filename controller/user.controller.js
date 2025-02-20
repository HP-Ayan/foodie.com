const asyncHandler = require('express-async-handler');  //async await lib.

const userModel = require("../model/user.model");       //consuming the user model.

//generates random user id.
function generateUserID() {
    return "user-" + Math.floor(Math.random() * 99999) + "-" + Date.now();
}

// adding new user.
const signUpUser = asyncHandler(async(eq,res)=>{
    const addUser = await userModel.create({
        "user_id": generateUserID(),
        "user_name": req.body.uname,
        "user_phone": req.body.uphone,
        "user_email": req.body.uemail,
        "user_pass1": req.body.upass1
    });
    if(!addUser){
        res.status(403).json({"message":"signup error"})
    }else{
        res.status(200).json({"message":"signup success"})
    };
});

module.exports = {signUpUser};
console.log("user controller is working");
