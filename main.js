//loading the express lib.
const express = require("express");

//loading cors lib.
const cors = require("cors");
const foodRouter = require("./routes/foods.routes");
const userRouter = require("./routes/user.route");

//env lib.
const env = require("dotenv").config();

//define port and host globally
var port = process.env.HOST_PORT || 3000;
var host = process.env.HOST || "127.0.0.1";

//create an instance of express
const app = express();
app.use(cors());
//creating server static resourse
app.use(express.static("public"));
console.log(`SSR is working on public folder`);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/users",userRouter)
app.use('/api/foods',foodRouter);



app.get("/",(req,res)=>{
    res.send("<h1>Welcome to online food order application</h1>");
});
app.listen(port,host,()=>{
    console.log(`Express server has started at http://${host}:${port}/`);
    
})