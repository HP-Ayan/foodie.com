const env = require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        var decoded = jwt.verify(req.headers.token, process.env.PRIVATE_KEY)
    }
    catch (error) {
        return res.status(401).json({
            "message": error,
            "info": "token has been expired or it is invalid"
        });
    } finally {
        next(); //point the routes from where it is being called.
    }
};

console.log(`middleware authentication is working`);
