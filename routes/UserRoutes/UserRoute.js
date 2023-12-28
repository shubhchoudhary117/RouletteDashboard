const express=require("express");
const UserController=require("../../Controllers/UserControllers/UserController.js")
const router=express.Router();

// set rotes 
router.get("/getuser",UserController.getUser);
router.post("/getuser-byid",UserController.getUserById);
module.exports=router;