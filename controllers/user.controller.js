
const getuser = (req, res ) =>{
  res.json({
    "users":[
      {"name":"martin","class":"Nodejs", "gender":"male"},
      {"name":"kush","class":"React", "gender":"male"},
      {"name":"Tolu","class":"Angular", "gender":"male"},
      {"name":"Dayo","class":"Nodejs", "gender":"male"},
      {"name":"Demola","class":"Vuejs", "gender":"male"},
      {"name":"Akeem","class":"Nodejs", "gender":"male"},
    ]
 })
}

const getdefault = (req ,res) =>{
 console.log( __dirname);
   console.log(req.query);
   const {name} = req.query 
  // res.sendFile(__dirname + "/index.html")
  res.render("index",{gender:"female",name})
}

module.exports = {getuser, getdefault}