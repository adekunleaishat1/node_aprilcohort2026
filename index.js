const express = require("express")
const app = express()
require("ejs")
const mongoose = require("mongoose")
require("dotenv").config()
const connect = require("./Database/db.config")
const usermodel = require("./model/usermodel")
const todomodel = require("./model/todomodel")
const userrouter = require("./routes/user.route")

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use("/", userrouter)

// functions
let userarray = []
let curuser = ""








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

app.get("/todo", async(req, res)=>{
 try {
 
  const {name} = req.query
  if (name) {
    const alltodo = await todomodel.find()
    console.log(alltodo);
    
    return res.render("todo",{name, alltodo})
  }
  res.redirect("/login")
 } catch (error) {
  console.log(error);
  
 }
})
app.post("/user/login",async(req, res)=>{
   console.log(req.body);
   try {
       const {email , password} = req.body
      const existUser =   await usermodel.findOne({email})
      console.log(existUser);
    if (existUser && existUser.password == password) {
      console.log("login successful");
      curuser = existUser.username
      res.redirect(`/todo?name=${existUser.username}`)
    }else{
      console.log("invalid user");
       res.redirect("/login")
    }
   } catch (error) {
    console.log(error);
    
   }
 })

 app.post("/user/addtodo/:curuser", async(req, res)=>{
   try {
    console.log(req.params);
    const {curuser} = req.params
     console.log(req.body);
    const newtodo = await todomodel.create({
      ...req.body,
      user:curuser
     })
     if (newtodo) {
      return res.redirect(`/todo/?name=${curuser}`)
     }
    //  await todomodel.create({
    //   title:req.body.title,
    //   description:req.body.description,
    //   user:curuser
    //  })
   } catch (error) {
    
   }
 })
 
 app.post("/user/deletetodo/:id", async(req, res)=>{
   try {
    console.log(req.params);
    const {id} = req.params
    const deletedtodo = await todomodel.findByIdAndDelete(id)
    console.log(deletedtodo);
    
    if (deletedtodo) {
      return res.redirect(`/todo/?name=${deletedtodo.user}`)
    }
   } catch (error) {
    
   }
 })




 

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