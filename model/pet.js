let mongoose=require("mongoose")
let schema=mongoose.Schema({
    userid:{type:String},
    petname:{type:String},
    breed:{type:String},
    gender:{type:String},
    age:{type:Number},
     uri:{type:String},
     weight:{type:Number,max:100},
     vaccinated:{type:Boolean},
     src:{type:String}
})
let model=mongoose.model("pet",schema)
module.exports=model