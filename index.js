let mongoose=require("mongoose")
let express=require("express")
let bcrypt=require("bcrypt")
let app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
let conn=mongoose.connect("mongodb+srv://kayaar450_db_user:fDKrEjSbnVV1uIxS@cluster0.rzb4emq.mongodb.net/pet");
let db=mongoose.connection;
db.once("open",()=>{
    console.log("database connected succesfully")
})
db.on("error",()=>{
    console.log("error while connecting")
})
require("./routes/r1")(app)
app.listen(3000,()=>{
    console.log("server started")
})

