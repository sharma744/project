let nodemailer=require("nodemailer")
let Otp=require("../docs")
exports.otp_gen=async(req,res)=>{
  try{
    let body=req.body;
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,          // or 465 for SSL
      secure: false,
      auth: {
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_APP_PASS
      }
    });
    
      let otp=Math.floor(Math.random()*100000)
      Otp[body.gmail]={
        code:otp,
        expiry:Date.now()+5*60*1000
      }
      let send=await transporter.sendMail({
        from:'"Pet App" <aayusharma9711@gmail.com>',
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