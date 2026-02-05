let mongoose=require("mongoose")
let schema=mongoose.Schema({
    userid:{type:String},
    name:{type:String},
    bio:{type:String},
    contact:{type:Number},
     profile:{type:String},
     uri:{type:String},
     src:{type:String}
})
let model=mongoose.model("profile",schema)
module.exports=model