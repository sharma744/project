let nodemailer=require("nodemailer")
let Otp=require("../docs")
exports.otp_gen=async(req,res)=>{
  try{
    let body=req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kayaar450@gmail.com",
        pass: "qwxi bhyk glrm wxyx"
      }
    });
    
      let otp=Math.floor(Math.random()*100000)
      Otp[body.gmail]={
        code:otp,
        expiry:Date.now()+5*60*1000
      }
      let send=await transporter.sendMail({
        from:'"Pet App" <no-reply@petapp.com>',
        to:body.gmail,
        subject:"otp verification for pet site",
        text:`your otp is :${otp}`,
        html:`<h1> otp is :${otp}</h1>`
      })
      console.log(send)
      res.send("otp send succesfully")
    }catch(err){
       res.send("error occured")
    }
     

}