let control=require("/Users/aayushsharma/indiafluence_project/serverside/controller/c1.js")
let multer=require("multer")
let upload=multer({dest:"/Users/aayushsharma/indiafluence_project/serverside/uploads"})
let middlwr=require("../middelware/otp_gen")
route=(app)=>{
    app.post("/login",control.login)
    app.post("/otp",middlwr.otp_gen)
    app.post("/signup",control.signup)
    app.post("/profile",upload.single("image"),control.profile)
    app.post("/pet",upload.single("image"),control.pet)
    app.get("/data",control.get_data)
}
module.exports=route
