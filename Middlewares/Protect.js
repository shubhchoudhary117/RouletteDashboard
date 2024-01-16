const jwt = require("jsonwebtoken");
const UserModel = require("../models/AuthModels/UserModel");
var session=require("../app.js")
let Protect = async (req, res, next) => {
    try {
        // get header token and session token 
        let  HeaderToken  = req.headers.authorization;
        let SessionToken=req.session.authtoken;
        let authtoken="";
        if(HeaderToken){
            authtoken=HeaderToken.split(" ")[1];
        }else if(SessionToken){
            authtoken=SessionToken.split(" ")[1]
        }else{
            // if no any token in user session and request headers so we will send unauthorized response
            return res.status(401).json({ badcredintals: true, authorization: false, 
                tokeninvalid: true, internalServerError: false })
        }
        if (authtoken) {
            // after getting authtoken successfully then we are verify the token
            let decoded = jwt.verify(authtoken, Buffer.from(process.env.SECRET_KEY, 'base64'),{algorithm:'HS256' ,subject:'username'});
            if (decoded) {
                // geting the user and check user have letest jwt token or not
                let user=await UserModel.findOne({_id:decoded.userid});
                // console.log(user)
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
















