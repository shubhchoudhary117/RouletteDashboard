const mongoose=require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then((response)=>{
    console.log("database connected successfull")
})
.catch((error)=>{
    console.log(error);
})
