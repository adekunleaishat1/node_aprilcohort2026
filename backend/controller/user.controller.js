const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const verificationMail = require("../utils/emailverification");



const userSignup = async (req, res) =>{
    try {
       console.log(req.body);
        const { username , email , password} = req.body
        if (!username || !email || !password) {
         return res.status(400).json({message :"All fields are mandatory", status:false})
        }
      const hashedPassword =   await bcrypt.hash(password,10)
      console.log(hashedPassword);
      
       const newUser = await usermodel.create({...req.body, password:hashedPassword})
       console.log(newUser);
       if (newUser) {
         const mail = await verificationMail({email , username})
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
      const existuser =   await usermodel.findOne({email})
      if (existuser) {
       const hashedpassword = await bcrypt.compare(password, existuser.password)
       console.log(hashedpassword);

       if (hashedpassword) {
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