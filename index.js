const express = require("express")
const app = express()
require("ejs")
const mongoose = require("mongoose")




// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded())


// functions
let userarray = []
let curuser = ""

const userschema = new mongoose.Schema({
  username:{type:String, required:true},
  email:{type:String,unique:true, required:true},
  password:{type:String, required:true}
})

const usermodel = mongoose.model("user_collection",userschema)


app.get("/",(req, res)=>{
   console.log( __dirname);
   console.log(req.query);
   const {name} = req.query 
  // res.sendFile(__dirname + "/index.html")
  res.render("index",{gender:"female",name})
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
  console.log( req.query);
  const {message} = req.query
 res.render("signup",{message})
})

app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/user/signup", async(req, res)=>{
 console.log(req.body);
 const {username , email,password} = req.body
 let errormessage = ""
 try {
  if (!username || !email || !password) {
   errormessage = "All fields are mandatory"
   return res.redirect(`/signup/?message=${errormessage}`)
  }
   const alluser =  await usermodel.find()
   const existuser = alluser.find((user)=> user.email == req.body.email && user.password == req.body.password)
  if (existuser) {
    errormessage = "user already exist"
   return res.redirect(`/signup/?message=${errormessage}`)
  }
   const createdUser =  await usermodel.create(req.body)
   console.log(createdUser);
   if (createdUser) {
     return res.redirect("/login")
   }
    return res.redirect("/signup")
 } catch (error) {
  console.log(error);
 }
})

app.post("/user/login",(req, res)=>{
   console.log(req.body);
   const {email , password} = req.body
   const existuser =  userarray.find((user)=> user.email === email)
   console.log(existuser);
    if (existuser && existuser.password == password) {
      console.log("login successful");
      curuser = existuser.username
      res.redirect(`/?name=${existuser.username}`)
    }else{
      console.log("invalid user");
       res.redirect("/login")
    }
 })




 const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/April2026?appName=Cluster0"



 const connect = async() =>{
  try {
   const connection = await mongoose.connect(uri)
   if(connection){
    console.log("database connected successfully");
   }
  } catch (error) {
    console.log(error);
    
  }
 }
connect()


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