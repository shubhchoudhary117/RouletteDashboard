const UserModel=require("../../models/AuthModels/UserModel.js")

class UserController{
    // get a authenticate user
    static getUser=async(req,res)=>{
        let userid=req.userid;
        try{
            let user=await UserModel.findOne({_id:userid});
            return res.json({authorized:true,user:user,internalServerError:false})
        }catch(error){
            console.log(error);
            return res.json({authorized:false,user:null,internalServerError:true})
        }
    }
}


module.exports=UserController;