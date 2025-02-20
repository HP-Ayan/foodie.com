const express = require("express");

const userRouter = express.Router();

//consumimng models
const userModel = require("../model/user.model");
const db_url = require("../model/dbconnect.config");
const userController = require('../controller/user.controller');

userRouter.post("/signup", userController.signUpUser
    

    // }).catch((error) => {
    //     if (error.errorResponse?.keyPattern?.user_phone) {
    //         res.status(403).json({ "message": "Phone number alreaddy exists." })
    //     } else if (error.errorResponse?.keyPattern?.user_email) {
    //         res.status(403).json({ "message": "Email already exists." })
    //     } else {
    //         res.status(403).json(error)
    //     }
    // });
);

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
