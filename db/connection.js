const mongoose=require("mongoose");

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true })
.then((response)=>{
    console.log("database connected successfull")
})
.catch((error)=>{
    console.log(error);
})




module.exports=mongoose;





