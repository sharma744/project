let control=require("../controller/c1")
let multer=require("multer")
let upload=multer({dest:"../controller/uploads"})
let middlwr=require("../middelware/otp_gen")
route=(app)=>{
    app.post("/auth/login",control.login)
    app.post("/otp",middlwr.otp_gen)
    app.post("/auth/signup",control.signup)
    app.post("/profile",upload.single("image"),control.profile)
    app.post("/pet",upload.single("image"),control.pet)
    app.get("/data",control.get_data)
}
module.exports=route
