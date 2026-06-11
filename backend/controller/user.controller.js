const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const verificationMail = require("../utils/emailverification");
const generateotp = require("../utils/generateOtp")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")

const userSignup = async (req, res) =>{
    try {
       console.log(req.body);
        const { username , email , password} = req.body

        if (!username || !email || !password) {
         return res.status(400).json({message :"All fields are mandatory", status:false})
        }
      const hashedPassword =   await bcrypt.hash(password,10) // function to encode or hash user password

       const verificationotp = generateotp() // function to generate otp

       const newUser = await usermodel.create({...req.body, password:hashedPassword,verificationOtp:verificationotp}) // This is used to create the user on the database.
       console.log(newUser);

       if (newUser) {  
         const mail = await verificationMail({email , username, verificationotp}) // function to send verfication mail to user email address.
         console.log(mail);
         
         if (mail) {
          return res.status(200).json({message:"User signup successful", status:true})
         }
        
       }
    } catch (error) {
        if (error.message.includes("duplicate key error collection")) {
          return res.status(500).json({message:"user already exist", status:false})
        }
        return res.status(500).json({message:error.message, status:false})
    }
}

const userLogin = async (req, res) =>{
    try {
        const {email , password} = req.body
        if (!email || !password) {
          return res.status(400).json({message:"All fields are mandatory"})
        }
      const existuser =   await usermodel.findOne({email}) // This is to find the user on my database if it exist 

      if (existuser) {

       const hashedpassword = await bcrypt.compare(password, existuser.password) // Using bcryptjs to compare the password.
       console.log(hashedpassword);

       if (hashedpassword) {

         if (!existuser.verified) { // This will check if the user email has been verified.
           return res.status(407).json({message:"please verify your email; check your mail."})
         }
        const token =  await jwt.sign({email:existuser.email}, process.env.JWT_SECRETKEY, {expiresIn:3000})
        return res.status(200).json({message:"user login successful", token})
       }
       return res.status(407).json({message:"Invalid credentials"})
      }
      return res.status(401).json({message:"invalid credentials"})
    } catch (error) {
        return res.status(500).json({message:error.message, status:false})
    }
}

const verifyEmail = async(req , res) =>{
  try {
    const {otp} = req.body
    if (!otp || otp.length !== 4) {
      return res.status(400).json({message:"invalid otp", status:false})
    }
    const user = await usermodel.findOne({verificationOtp:otp})
    console.log(user);
    if (!user) {
      return res.status(405).json({message:"email verification failed", status:false}) 
    }
   const verifieduser =   await usermodel.findOneAndUpdate(
       {verificationOtp:otp},
       {verified:true,verificationOtp:""},
      )
      if (verifieduser) {
        return res.status(200).json({message:"email verification successful", status:true})
      }
  } catch (error) {
    console.log(error); 
    return res.status(500).json({message:error.message, status:false})
  }
}

const uploadpicture = async(req, res) =>{
  try {
    const {image} = req.body
   console.log(req.user);
   const useremail = req.user
  const existuser =  await usermodel.findOne({email:useremail})
  console.log(existuser);
  console.log(existuser.profilePicture, "check if user jhas a profile picture" );
  if (existuser.profilePicture.public_id) {
    console.log("working");
    const deletedimage = await cloudinary.uploader.destroy(existuser.profilePicture?.public_id)
  }
  const cloudimage =  await cloudinary.uploader.upload(image)
  const updateduser =  await usermodel.findOneAndUpdate(
    {email:useremail},
    {profilePicture:{
      public_id:cloudimage.public_id,
      image_url: cloudimage.secure_url
    }}

   )

   if (!updateduser) {
      return res.status(405).json({message:"profile update failed", status:false}) 
   }

  return res.status(200).json({message:"profile image updated successfully", status:true}) 
  
  } catch (error) {
    console.log(error);
    
  }
}
module.exports = {userSignup, userLogin, verifyEmail,uploadpicture}