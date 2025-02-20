const asyncHandler = require('express-async-handler');  //express async handler lib.

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


const addFood = asyncHandler(async (req, res) => {
    const addNewFood = foodsModel.create({
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
});

const deleteFood = asyncHandler(async (req, res) => { 
    
});

const findAllFoods = asyncHandler(async (req, res) => { });

const updateFood = asyncHandler(async (req, res) => { });

const findFoodById = asyncHandler(async (req, res) => { });

module.exports = { addFood, deleteFood, findAllFoods, updateFood, findFoodById }