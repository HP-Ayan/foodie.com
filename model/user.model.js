const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "user_id": {
        type: String,
        require: [true, 'User ID is required']
    },
    "user_name": {
        type: String,
        minLenght: 3,
        maxLenght: 15,
        require: [true, "Name is required, minimum 3 char, maximum 9 char"]
    },
    "user_phone": {
        type: String,
        unique: true,
        required: [true, "Phone number is required"],
        validate:{
            validator:(elementValue)=>{
                return /^[6-9]\d{9}$/.test(elementValue);
            },
            message:props=>`${props.value} is not an Indian number.`
        }
    },
    "user_email": {
        type: String,
        unique: true,
        required: [true, "Email has to be provided"],
        validate:{
            validator:(elementValue)=>{
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elementValue);
            },
            message:props=>`${props.value} is not a valid email address.`
        }
    },
    "user_pass1": {
        type: String,
        require: [true, "Passsword is mandetory"]
    }
},{versionKey:false});

module.exports = mongoose.model("usermodel", userSchema, "user");
console.log(`User model is working`);