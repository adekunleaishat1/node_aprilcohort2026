const mongoose = require("mongoose")


const userschema = new mongoose.Schema({
  username:{type:String, required:true},
  email:{type:String,unique:true, required:true},
  password:{type:String, required:true},
  verified:{type:Boolean, default:false},
  verificationOtp:{type:String, required:true},
  profilePicture:{
    public_id:{type:String},
    image_url:{type:String}
  } 
})

const usermodel = mongoose.model("user_collection",userschema)

module.exports = usermodel