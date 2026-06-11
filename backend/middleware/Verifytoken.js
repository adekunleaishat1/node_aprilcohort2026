const jwt = require("jsonwebtoken")

const verification = async(req , res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
   if (!token) {
    return res.status(400).json({message:"invalid token", status:false})
   }
  const verifiedToken = await jwt.verify(token, process.env.JWT_SECRETKEY)
  console.log(verifiedToken);
  if (verifiedToken) {
    req.user = verifiedToken.email
    console.log(verifiedToken, "user token veriofication");
    next()
    // return res.status(200).json({message:"Token verified", email:verifiedToken.email})
  }
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message, status:false})
  }
}

module.exports = verification