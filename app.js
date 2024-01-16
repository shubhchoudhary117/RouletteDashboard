const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken");
const app = express();
const AuthRoutes = require("./routes/AuthRoutes/AuthRoute.js");
const UserRoutes = require("./routes/UserRoutes/UserRoute.js");
const UserModel=require("./models//AuthModels/UserModel.js")
const Protect = require("./Middlewares/Protect.js")
const cookieParser = require("cookie-parser")
var session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);
var dotenv = require("dotenv");
dotenv.config();
// connect to database
require("./db/connection.js")

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});

// set the session 
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store:store,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds,
    sameSite:'None'
  }
}))

// set the middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())



// cors policy configuration
app.use(cors({
  origin: 'https://roulette-1d15b.web.app',
  credentials: true,
  optionsSuccessStatus: 200,
}));


// set the URL prefix
app.use("/roulette/user", AuthRoutes);
app.use("/roulette/user", Protect, UserRoutes)


// port of express sever our server is runing on this port number
let PORT = process.env.PUBLIC_URL || 8000;
// create server and set port
app.listen(PORT, () => {
  console.log(`App is runnig on port _____${PORT}_____`)
})


module.exports=session;