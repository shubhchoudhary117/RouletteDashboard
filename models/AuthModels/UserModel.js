const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    Username:{
        type:String,
        require:true,
        trim:true
    },
    Email:{
        type:String,
        require:true,
        trim:true
    },
    Password:{
        type:String,
        require:true,
        trim:true
    },
    Token:{
        type:String,
        require:true,
        trim:true
    }

})

// create a model of this schema
const UserModel=mongoose.model("Usermodel",UserSchema);

module.exports=UserModel;