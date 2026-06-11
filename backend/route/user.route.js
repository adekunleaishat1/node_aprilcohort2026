const express = require("express")
const userrouter = express.Router()

const {userSignup, userLogin, verifyEmail, uploadpicture} = require("../controller/user.controller")
const verification = require("../middleware/Verifytoken")

userrouter.post("/signup", userSignup)
userrouter.post("/login", userLogin)
userrouter.post("/verify", verifyEmail)
userrouter.get("/verify/token", verification)
userrouter.put("/uploadprofile",verification, uploadpicture)



module.exports = userrouter