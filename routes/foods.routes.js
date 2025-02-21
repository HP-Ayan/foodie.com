//express lib.
const express = require('express');

//consuming models.
const foodsModel = require('../model/foods.model');
const db_url = require("../model/dbconnect.config");
const foodController = require('../controller/food.controller')

//env lib
const env = require("dotenv").config();

//create one router for this foods API endpoints
const foodRouter = express.Router();

//consuming the multer lib.
const multer = require('multer');
const myStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, "food-" + Math.floor(Math.random() * 99999) + "-" + Date.now() + "-" + file.originalname);
    },
    destination: "./public/uploads/"
});
const singleUpload = multer({
    storage: myStorage
});

//loading the base url
const baseURL = require('../model/base_url');


foodRouter.get("/all", foodController.findAllFoods);

//find with id
foodRouter.get("/show/:fid", foodController.findFoodById);

//getting foods depends on price range:
foodRouter.get("/limit/:l1/:l2", foodController.foodByPrice)


//adding one food in the database
foodRouter.post("/add", singleUpload.single('mAvatar'), foodController.addFood);


//Adding a Update on food depends on food id
foodRouter.all("/update/:fid", singleUpload.single("mAvatar"), foodController.updateFood);


//food deletion depends on food_id
foodRouter.delete("/delete/:fid", foodController.deleteFood);

//------------------------------------------------------------------
//find food with food name.
foodRouter.get("/show/:fname", (req, res) => {
    foodsModel.findOne({ "food_name": req.params.fname }).exec()
        .then((foodInfo) => {
            if (foodInfo)
                res.status(200).json(foodInfo);
            else
                res.status(200).json({ "message": "No_food_found" })
        })
        .catch((error) => { });
});
//------------------------------------------------------------------

module.exports = foodRouter;
console.log('FoodRouter is ready to use')