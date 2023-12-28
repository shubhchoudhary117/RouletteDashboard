const jwt = require("jsonwebtoken");
const UserModel = require("../models/AuthModels/UserModel");

let Protect = async (req, res, next) => {
    try {
        let { authtoken } = req.cookies;
        if (authtoken) {
            let decoded = jwt.verify(authtoken, process.env.SECRET_KEY);
            if (decoded) {
                // geting the user and check user have letest jwt token or not
                let user=await UserModel.findOne({_id:decoded.userid});
                console.log(user)
                if(user.Token===authtoken){
                    req.userid = decoded.userid;
                    next();
                }else{
                    // if user token does not match then we are send unautorized response
                    return res.status(401).json({ badcredintals: true, authorization: false, tokeninvalid: true, internalServerError: false })
                }
            } else {
                return res.status(401).json({ badcredintals: true, authorization: false, tokeninvalid: true, internalServerError: false })
            }

        } else {
            return res.status(401).json({ badcredintals: true, authorization: false, tokeninvalid: true, internalServerError: false })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ badcredintals: true, authorization: false, tokeninvalid: false, internalServerError: true })
    }
}

module.exports = Protect
















// const jsonwebtoken = require("jsonwebtoken");


// const Protect = async (req, res, next) => {
//     try {
       
//         let token = "";
//         console.log(req.headers)
//         if (req.headers.authorization &&
//             req.headers.authorization.startsWith("Bearer")) {
              
//             console.log(req.headers.authorization)
//             token = req.headers.authorization.split(" ")[1];

//             let decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
//             console.log("decoded"+decoded)
//             if (decoded) {
//                 req.userid = decoded.userid
//             }
//             next();
//         } else {
//             return res.status(401).json({ badcredintals: true, authorization: false, tokeninvalid: true, internalServerError: false })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ badcredintals: false, authorization: false, tokeninvalid: false, internalServerError: true })
//     }


// }

// module.exports = Protect 
















