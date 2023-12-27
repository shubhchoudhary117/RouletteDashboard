const express=require("express");
const cors=require("cors")
const app=express();
const AuthRoutes=require("./routes/AuthRoutes/AuthRoute.js");
const UserRoutes=require("./routes/UserRoutes/UserRoute.js");
const Protect=require("./Middlewares/Protect.js")
const cookieParser = require("cookie-parser")
var dotenv=require("dotenv");
dotenv.config();
// connect to database
require("./db/connection.js")

// set the middlewares
// allow cross origin
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  optionsSuccessStatus: 200,
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())

// set the URL prefix
app.use("/roulette/user",AuthRoutes);
app.use("/roulette/user",Protect,UserRoutes)


// port of express sever our server is runing on this port number
let PORT=process.env.PUBLIC_URL||8000;
// create server and set port
app.listen(PORT,()=>{
  console.log(`App is runnig on port _____${PORT}_____`)
})