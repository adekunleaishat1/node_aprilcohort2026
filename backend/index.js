const express = require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.config")
const userrouter = require("./route/user.route")
const cors = require("cors")


app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/user", userrouter)




connect()
const port = 8003
app.listen(port ,()=>{
    console.log(`app started at port ${port}`);
    
})