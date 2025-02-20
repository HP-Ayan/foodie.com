//express lib.
const { configDotenv } = require('dotenv');
const express = require('express');

//consuming models.
const foodsModel = require('../model/foods.model');
const db_url = require("../model/dbconnect.config");
const foodController = require('../controller/food.controller')

//env lib
const env = require("dotenv").config();



function generateFoodID() {
    return "food-" + Math.floor(Math.random() * 99999) + "-" + Date.now();
}

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

console.log(`Multer is working`);


foodRouter.get("/all", (req, res) => {
    foodsModel.find().exec()
        .then((foodInfo) => {
            if (foodInfo.length > 0) {
                res.status(200).json(foodInfo);
            } else {
                res.status(200).json({ "message": "No food available" })
            }
        })
        .catch((error) => {
            res.status(200).json(error);
        });
});

//find with id
foodRouter.get("/show/:fid", (req, res) => {
    foodsModel.findOne({ "food_id": req.params.fid }).exec()
        .then((foodInfo) => {
            if (foodInfo)
                res.status(200).json(foodInfo);
            else
                res.status(200).json({ "message": "food_not_found" })
        })
        .catch((error) => { });
});

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

//getting foods depends on price range:
foodRouter.get("/limit/:l1/:l2", (req, res) => {
    if (req.params.l1 < req.params.l2) {
        foodsModel.find({
            $and: [
                { "food_price": { $gte: req.params.l1 } },
                { "food_price": { $lte: req.params.l2 } }
            ]
        }).exec()
            .then((foodInfo) => {
                if (foodInfo)
                    res.status(200).json(foodInfo);
                else
                    res.status(200).json({ "message": "no_food_found" })
            })
            .catch((error) => {
                res.status(200).json(error)
            });
    } else {
        res.status(403).json({ 'message': 'start index value has to be lower than last index' })
    }
})


//adding one food in the database
foodRouter.post("/add", singleUpload.single('mAvatar'),foodController.addFood, (req, res) => {

    // .then((foodinfo) => {
    //     if (foodinfo) {
    //         res.status(200).json({ "message": "Food_successfully_added" });
    //     } else {
    //         res.status(200).json({ "message": "Food_entry_error" });
    //     }
    // })
    // .catch((error) => {
    //     res.status(200).json(error);
    // });
});


//Adding a Update on food depends on medicine id
foodRouter.all("/update/:mid", singleUpload.single("mAvatar"), (req, res) => {
    if (req.method == 'PUT' || req.method == 'PATCH') {
        if (req.file) {
            ImagePath = baseURL + "/uploads/" + req.file.filename;
        } else {
            foodsModel.findOne({ "food_id": req.params.mid }).exec()
                .then((foodInfo) => {
                    ImagePath = foodInfo.food_image;
                })
                .catch((error) => {
                    res.status(403).json(error);
                })

        }

        foodsModel.updateOne({ "food_id": req.params.mid }, {
            $set: {
                "food_name": req.body.fname,
                "food_details": req.body.fdetails,
                "food_price": req.body.fprice,
                "food_image": ImagePath
            }
        }).then((foodInfo) => {
            // res.status(200).json(foodInfo);
            if (foodInfo.modifiedCount == 1) {
                res.status(200).json({ "message": "food_update_success" });
            } else {
                res.status(200).json({ "message": "food_update_error" });
            }
        }).catch((error) => {
            res.status(200).json(error);
        });
    } else {
        res.status(200).json({ "message": req.method + " this method doesnot support" });
    }
});


//food deletion depends on food_id
foodRouter.delete("/delete/:fid", (req, res) => {
    foodsModel.deleteOne({ "food_id": req.params.fid })
        .then((foodInfo) => {
            if (foodInfo.deletedCount == 1) {
                res.status(200).json({ "message": "food_delete_success" });
            } else {
                res.status(200).json({ "message": "food_delete_error" });
            }
        })
        .catch((error) => {
            res.status(500).json({ "message": "Internal server error" });
        })
});



module.exports = foodRouter;
console.log('FoodRouter is ready to use')