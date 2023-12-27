
const jwt = require("jsonwebtoken");

let Protect = async (req, res, next) => {
    try {
        let { authtoken } = req.cookies;
        if (authtoken) {
            let decoded = jwt.verify(authtoken, process.env.SECRET_KEY);
            if (decoded) {
                console.log(decoded)
                req.userid = decoded.user._id;
                next();
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