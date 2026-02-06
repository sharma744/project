let mongoose=require("mongoose")
let schema=mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        max:10
    },
    token:{type:String,default:null}
})
let coll=mongoose.model("login",schema);
module.exports=coll;