const otp_generator = require('otp-generator');

const generateotp = () =>{
 const otp =  otp_generator.generate(4, {digits:true,
     lowerCaseAlphabets:true, 
     upperCaseAlphabets:false,
     specialChars:false})
 return otp
}

module.exports = generateotp