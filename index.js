let mongoose=require("mongoose")
let express=require("express")
let bcrypt=require("bcrypt")
require("dotenv").config();
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});



