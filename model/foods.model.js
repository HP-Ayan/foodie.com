const mongoose = require('mongoose');
const foodSchema=mongoose.Schema({
    "food_id":{
        type:String,
        require:[true,"Food id is required"]
    },
    "food_name":{
        type:String,
        require:[true,'Food name is required']
    },
    "food_Details":{
    type:String,
    require:[true,'Food details are required']
    },
    "food_price":{
        type:Number,
        require:[true,"Food price is required"]
    },
    "food_image":{
        type:String,
        require:[true,"Food image is required"]
    }
},{versionKey:false});

module.exports=mongoose.model("foodsModel",foodSchema,"foodList")
console.log(`FoodsModel is ready to use`);
