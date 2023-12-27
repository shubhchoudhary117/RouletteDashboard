const express=require("express");
const UserController=require("../../Controllers/UserControllers/UserController.js")
const router=express.Router();

// set rotes 
router.get("/getuser",UserController.getUser);
module.exports=router;