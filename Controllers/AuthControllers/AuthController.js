const UserModel = require("../../models/AuthModels/UserModel.js");
const jsonwebtoken = require("jsonwebtoken");
var session=require("../../app.js")
class AuthController {

   static onUserRegister = async (req, res) => {
      try {
         console.log(req.body)
         let { username, email, password } = req.body;
         // check the user is already exist or not
         let userExist = await UserModel.findOne({ Email: email });
         if (userExist) {
            res.json({ registered: false, emailExist: true, internalServerError: false });
         } else {
            // add new user
            let newUser = new UserModel({
               Username: username,
               Email: email,
               Password: password
            });
            // save the new user details
            let addedUser = await newUser.save();
            return res.json({ registered: true, emailExist: false, user: addedUser, internalServerError: false });
         }
      }
      catch (error) {
         console.log(error);
         return res.json({ registered: false, emailExist: false, internalServerError: true });
      }
   }


   // on user login we check credintals
   static onUserLogin = async (req, res) => {
      try {
         let { email, password } = req.body;
         let user = await UserModel.findOne({ Email: email });
       
         if (user) {
            if (user.Password === password) {
               // generate the jsonwebtoken
                // token expiration date
               let expirationDate=30 * 24 * 60 * 60 * 1000;
               let token = jsonwebtoken.sign({ userid: user._id }, Buffer.from(process.env.SECRET_KEY, 'base64'),
                   { expiresIn: expirationDate,algorithm:'HS256' ,subject:'username'});
               // save the token in user details
               let updated = await UserModel.updateOne({ Email: user.Email }, { Token:token })
              
               // Set the Auth Token In Response Cookies
               // res.cookie("authtoken", token, { httpOnly: true });
               // req.session.authtoken='Bearer '+token
               console.log("seted")
               return res.json({ login: true, emailIsInvalid: false, passwordIsInvalid: false, Token: token, internalServerError: false })
            } else {
               return res.json({ login: false, Token:null, emailIsInvalid: false, passwordIsInvalid: true })
            }
         } else {
            res.json({ login: false, emailIsInvalid: true, Token: null, passwordIsInvalid: true, internalServerError: false })
         }
      } catch (error) {
         console.log(error)
         res.json({ login: false,Token: null, emailIsInvalid: false, passwordIsInvalid: false, internalServerError: true });
      }
   }

   // Logout the user
   static LogoutUser = async (req, res) => {
      try {
         // remove the token from cookie
         res.clearCookie("authtoken", { httpOnly: true, expires: new Date(Date.now()) })
         return res.json({ logout: true, internalServerError: false });
      }
      catch (error) {
         consoel.log(error)
         res.json({ logout: false, internalServerError: true });
      }
   }



}


module.exports = AuthController;