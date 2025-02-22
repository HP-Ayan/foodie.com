const asyncHandler = require('express-async-handler');  //async await lib.
const userModel = require("../model/user.model");       //consuming the user model.
const bcrypt = require('bcryptjs');
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");

function createToken(userInfo) {
    return (
        jwt.sign({ "_id": userInfo._id }, process.env.PRIVATE_KEY, {
            expiresIn: "2h"
        })
    );
};

//password hashing
function makePassHass(input) {
    var salt = bcrypt.genSaltSync(10);
    var hashPass = bcrypt.hashSync(input, salt);
    return hashPass;
}

//password checking with the real one
function checkHashPass(input, db_pass) {
    var isCheck = (bcrypt.compareSync(input, db_pass)) ? true : false;
    return isCheck;
}

//generates random user id.
function generateUserID() {
    return "user-" + Math.floor(Math.random() * 99999) + "-" + Date.now();
}

// Sign Up.
const signUpUser = asyncHandler(async (req, res) => {
    try {
        const addUser = await userModel.create({
            "user_id": generateUserID(),
            "user_name": req.body.uname,
            "user_phone": req.body.uphone,
            "user_email": req.body.uemail,
            "user_pass1": makePassHass(req.body.upass1)
        });
        if (!addUser) {
            res.status(403).json({ "message": "signup error" })
        } else {
            res.status(200).json({ "message": "signup success", "user": addUser })
        };
    }
    catch (error) {
        if (error) {
            if (error.errorResponse?.keyPattern?.user_phone) {
                res.status(403).json({ "message": "Phone number alreaddy exists." })
            } else if (error.errorResponse?.keyPattern?.user_email) {
                res.status(403).json({ "message": "Email already exists." })
            } else {
                res.status(403).json({ "message": error.message })
            }
        }
    }
});

//Sign In.
const signInUser = asyncHandler(async (req, res) => {
    try {
        const userInfo = await userModel.findOne({ "user_email": req.body.uemail }).exec();

        if (!userInfo) {
            res.status(404).json({ "message": "user not found" });
        } else {
            let dbPass = userInfo.user_pass1
            if (checkHashPass(req.body.upass1, dbPass)) {
                res.status(200).json({
                    "message": "login success",
                    "userInfo": userInfo,
                    "token": createToken(userInfo)
                });
            } else {
                res.status(401).json({ "message": "password does not match" })
            };
        };
    }
    catch (error) {
        res.status(500).json({ "message": "internal server error" });
    };
});

//Find all Users.
const findAllUser = asyncHandler(async (req, res) => {
    try {
        const userInfo = await userModel.find().exec();
        if (userInfo.length > 0) {
            res.status(200).json(userInfo)
        } else {
            res.status(404).json({ "message": "No user data available" })
        }
    }
    catch (error) {
        res.status(500).json(error, { "message": "internal server error" });
    }
});

// deleteUser by email
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userInfo = await userModel.deleteOne({ "user_email": req.params.email })
        if (userInfo.deletedCount == 1) {
            res.status(200).json({ "message": "user data delete success" })
        } else {
            res.status(403).json({ "message": "user delete error" })
        }
    }
    catch (error) {
        res.status(500).json(error.message, { "message": "Internal server error" })
    }
});

module.exports = { signUpUser, signInUser, findAllUser, deleteUser };
console.log("user controller is working");
