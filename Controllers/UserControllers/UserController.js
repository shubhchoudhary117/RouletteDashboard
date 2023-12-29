const UserModel=require("../../models/AuthModels/UserModel.js")

class UserController{
    // get a authenticate user
    static getUser=async(req,res)=>{
        console.log(req.get('origin'))
        let userid=req.userid;
        try{
            let user=await UserModel.findOne({_id:userid});
            return res.json({authorized:true,user:user,internalServerError:false})
        }catch(error){
            console.log(error);
            return res.json({authorized:false,user:null,internalServerError:true})
        }
    }


    static getUserById=async(req,res)=>{
        try{
            let user=await UserModel.findOne({Email:req.body.userid});
            return res.status(200).json({User:user,internalServerError:false})
        }catch(error){
            console.log(error);
            return res.status(501).json({User:user,internalServerError:false})
        }
    }
}


module.exports=UserController;