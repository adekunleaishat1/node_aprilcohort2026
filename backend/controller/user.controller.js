const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const verificationMail = require("../utils/emailverification");
const generateotp = require("../utils/generateOtp")



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
        return res.status(200).json({message:"user login successful"})
       }

       return res.status(407).json({message:"Invalid credentials"})
       
      }
      return res.status(401).json({message:"invalid credentials"})
    } catch (error) {
        return res.status(500).json({message:error.message, status:false})
    }
}

module.exports = {userSignup, userLogin}