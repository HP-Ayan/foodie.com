const express = require("express");

const userRouter = express.Router();

//consumimng user model
const userModel = require("../model/user.model");

//all user related api endpoints

//sign up api
function generateUserID() {
    return "user-" + Math.floor(Math.random() * 99999) + "-" + Date.now();
}

userRouter.post("/signup", (req, res) => {
    userModel.create({
        "user_id": generateUserID(),
        "user_name": req.body.uname,
        "user_phone": req.body.uphone,
        "user_email": req.body.uemail,
        "user_pass1": req.body.upass1
    }).then((userInfo) => {
        if (userInfo) {
            res.status(200).json({ "message": "Signup_success ", "data": userInfo })
        } else {
            res.status(200).json({ "message": "Signup_error" })
        }
    }).catch((error) => {
        if (error.errorResponse?.keyPattern?.phone) {
            res.status(403).json({ "message": "Phone number alreaddy exists." })
        } else if (error.errorResponse?.keyPattern?.email) {
            res.status(403).json({ "message": "Email already exists." })
        } else {
            res.status(403).json(error.message)
        }
    });
});

module.exports = userRouter;
console.log(`User router is working`);
