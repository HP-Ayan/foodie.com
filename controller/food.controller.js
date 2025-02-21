const asyncHandler = require('express-async-handler');  //express async handler lib.
const foodsModel = require('../model/foods.model')
const baseURL = require('../model/base_url');

//consuming the multer lib.
const multer = require('multer');


const myStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, "food-" + Math.floor(Math.random() * 99999) + "-" + Date.now() + "-" + file.originalname);
    },
    destination: "./public/uploads/"
});
const singleUpload = multer({ storage: myStorage });
console.log(`multer is working`);

//generating random food id
function generateFoodID() {
    return "food-" + Math.floor(Math.random() * 99999) + "-" + Date.now();
}

const addFood = asyncHandler(async (req, res) => {
    try {
        const addNewFood = await foodsModel.create({
            "food_id": generateFoodID(),
            "food_name": req.body.fname,
            "food_Details": req.body.fdetails,
            "food_price": req.body.fprice,
            "food_image": baseURL + "/uploads/" + req.file.filename
        });
        if (!addNewFood) {
            res.status(400).json({ "message": "error" })
        } else {
            res.status(200).json({ "message": "food add succsess" })
        }
    }
    catch (error) {
        return res.status(403).json({ "message": "error"}, error.message)
    }

});

const deleteFood = asyncHandler(async (req, res) => {
    try {
        const deleteFood = await foodsModel.deleteOne({ "food_id": req.params.fid })
        if (deleteFood.deletedCount == 1) {
            res.status(200).json({ "message": "food_delete_success", deleteFood });
        } else {
            res.status(200).json({ "message": "food_delete_error" });
        }
    }
    catch (error) {
        return res.status(403).json(error.message)
    };
});

const findAllFoods = asyncHandler(async (req, res) => {
    try {
        const allFoods = await foodsModel.find().exec();
        if (allFoods.length > 0) {
            res.status(200).json(allFoods);
        } else {
            res.status(200).json({ "message": "No food available" })
        }
    }
    catch (error) {
        return res.status(200).json(error.message)
    }
});


const updateFood = asyncHandler(async (req, res) => {
    try {
        if (req.method == 'PUT' || req.method == 'PATCH') {
            if (req.file) {
                ImagePath = baseURL + "/uploads/" + req.file.filename;
            } else {
                foodsModel.findOne({ "food_id": req.params.fid }).exec()
                    .then((foodInfo) => {
                        ImagePath = foodInfo.food_image;
                    })
                    .catch((error) => {
                        res.status(403).json(error);
                    })
            }
            const foodUpdate = await foodsModel.updateOne({ "food_id": req.params.fid }, {
                $set: {
                    "food_name": req.body.fname,
                    "food_details": req.body.fdetails,
                    "food_price": req.body.fprice,
                    "food_image": ImagePath
                }
            });
            if (foodUpdate.modifiedCount == 1) {
                res.status(200).json({ "message": "food_update_success" });
            } else {
                res.status(200).json({ "message": "food_update_error" });
            }
        } else {
            res.status(200).json({ "message": req.method + " this method doesnot support" });
        };
    }
    catch (error) {
        return res.status(403).json(error.message);
    };

});

const findFoodById = asyncHandler(async (req, res) => {
    try {
        const foodInfo = await foodsModel.findOne({ "food_id": req.params.fid }).exec();
        if (foodInfo) {
            res.status(200).json(foodInfo);
        } else {
            res.status(200).json({ "message": "food_not_found" })
        }
    }
    catch (error) {
        return res.status(403).json(error.message)
    };

});

const foodByPrice = asyncHandler(async (req, res) => {
    try {
        if (req.params.l1 < req.params.l2) {
            const foodInfo = await foodsModel.find({
                $and: [
                    { "food_price": { $gte: req.params.l1 } },
                    { "food_price": { $lte: req.params.l2 } }
                ]
            }).exec();
            if (foodInfo>0) {
                res.status(200).json(foodInfo);
            } else {
                res.status(200).json({ "message": "no_food_found" })
            }
        } else {
            res.status(403).json({ 'message': 'start index value has to be lower than last index' })
        }
    }
    catch (error) {
        return res.status(403).json(error.message)
    };
});

module.exports = { addFood, deleteFood, findAllFoods, updateFood, findFoodById, foodByPrice };
console.log(`food controller is working`);
