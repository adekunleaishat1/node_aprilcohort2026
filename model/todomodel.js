const mongoose = require("mongoose")

const todoschema = new mongoose.Schema({
  title:{type:String, required:true, trim:true},
  description:{type:String, required:true, trim:true},
  user:{type:String, required:true}
})
const todomodel = mongoose.model("todo_collection", todoschema)

module.exports = todomodel