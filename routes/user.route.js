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
        if (error.errorResponse?.keyPattern?.user_phone) {
            res.status(403).json({ "message": "Phone number alreaddy exists." })
        } else if (error.errorResponse?.keyPattern?.user_email) {
            res.status(403).json({ "message": "Email already exists." })
        } else {
            res.status(403).json(error)
        }
    });
});

// -----------------------------------------------------------------------------------

//show all users
userRouter.get("/all", (req, res) => {
    userModel.find().exec()
        .then((userInfo) => {
            if (userInfo.length > 0) {
                res.status(200).json(userInfo)
            } else {
                res.status(404).json({ "message": "No user data availabl" })
            }
        })
        .catch((error) => {
            res.status(500).json(error, { "message": "internal server error" });
        });
});

//-------------------------------------------------------------------------------------

//delete user by email.
userRouter.delete("/delete/:email", (req, res) => {
    userModel.deleteOne({ "user_email": req.body.email })
        .then((userInfo) => {
            if (userInfo.deletedCount == 1) {
                res.status(200).json({ "message": "user data delete success" })
            } else {
                res.status(403).json({ "message": "user delete error" })
            }
        })
        .catch((error) => {
            res.status(500).json(error.message, { "message": "Internal server error" })
        })
});

module.exports = userRouter;
console.log(`User router is working`);
