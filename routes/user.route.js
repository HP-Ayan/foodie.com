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

//user Sign in
userRouter.post("/signin", userController.signInUser);

// -----------------------------------------------------------------------------------

//show all users
userRouter.get("/all", userController.findAllUser);

//-------------------------------------------------------------------------------------

//delete user by email.
userRouter.delete("/delete/:email", userController.deleteUser);

module.exports = userRouter;
console.log(`User router is working`);
