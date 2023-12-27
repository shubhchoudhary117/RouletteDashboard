const express=require("express");
const AuthController=require("../../Controllers/AuthControllers/AuthController.js");
const UserController=require("../../Controllers/UserControllers/UserController.js")
const router=express.Router();

// create router endpoints
router.post("/register",AuthController.onUserRegister);
router.post("/login",AuthController.onUserLogin);
router.get("/logout",AuthController.LogoutUser)

module.exports=router;