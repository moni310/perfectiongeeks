const mongoose = require("mongoose");

const Register = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    refferalBonus: { type: Number,default:0 },
    referral_code: { type: String },
    password:{type:String},
    id:{type:String}

});
module.exports = mongoose.model("User", Register);
