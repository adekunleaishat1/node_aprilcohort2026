const express = require("express")

const userrouter = express.Router()
const {getdefault, getuser} = require("../controllers/user.controller")

userrouter.get("/users",getuser)

userrouter.get("/", getdefault)


module.exports = userrouter