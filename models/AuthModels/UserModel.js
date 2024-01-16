const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        require: true,
        trim: true
    },
    Email: {
        type: String,
        require: true,
        trim: true
    },
    Password: {
        type: String,
        require: true,
        trim: true
    },
    coin: {
        type: Number,
        required: true,
        default: "10000"
    },
    Status: {
        type: Boolean,
        reqired: true
    },
    AgentId: {
        type: String,
        required: true,
        default: "A1"
    },
    ProviderId: {
        type: String,
        default: "P1"
    },
    Token: {
        type: String,
        require: true,
        trim: true
    }

})


// create a model of this schema
const UserModel = mongoose.model("Usermodel", UserSchema);

module.exports = UserModel;