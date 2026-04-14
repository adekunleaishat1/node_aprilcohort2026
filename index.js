const express = require("express")
const app = express()
require("ejs")


// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded())


// functions
let userarray = []

app.get("/",(req, res)=>{
   console.log( __dirname);
   
  // res.sendFile(__dirname + "/index.html")
  res.render("index")
})

app.get("/users",(request, response)=>{
//  response.send("Welcome to your Node class")
 response.json({
    "users":[
      {"name":"martin","class":"Nodejs", "gender":"male"},
      {"name":"kush","class":"React", "gender":"male"},
      {"name":"Tolu","class":"Angular", "gender":"male"},
      {"name":"Dayo","class":"Nodejs", "gender":"male"},
      {"name":"Demola","class":"Vuejs", "gender":"male"},
      {"name":"Akeem","class":"Nodejs", "gender":"male"},
    ]
 })
})

app.get("/signup",(req, res)=>{
 res.render("signup")
})

app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/user/signup",(req, res)=>{
 console.log(req.body);
  userarray.push(req.body)
   console.log(userarray);
  //  res.send("signup successful")
  res.redirect("/login")
})

app.post("/user/login",(req, res)=>{
   console.log(req.body);
   const {email , password} = req.body
   const existuser =  userarray.find((user)=> user.email === email)
   console.log(existuser);
    if (existuser && existuser.password == password) {
      console.log("login successful");
      
    }else{
      console.log("invalid user");
      
    }
 })

const port = 8003
app.listen(port,()=>{
 console.log(`app started at port ${port}`);
 
})


// const username = "lola"
// let userarray = ["shola", "teni"]

// function updatearray() {
//     userarray.push(username)
//     console.log(userarray);
    
// }
// updatearray()