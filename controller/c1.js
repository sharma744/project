let db=require("../model/auth")
let prf=require("../model/user")
let pet=require("../model/pet")
let bcrypt=require("bcrypt")
let cloudinary=require("cloudinary").v2
let fs=require("fs");
let Otp=require("../docs")
let jwt=require("jsonwebtoken");
exports.login=async(req,res)=>{
  try{
    let body=req.body;
    console.log(body)
    console.log(Otp[body.gmail])
    let otp=Otp[body.gmail]
    let num=Number(body.otp)
  let token=jwt.sign(body,"aayush",{expiresIn:12*60*60})
  let data=await db.findOne({
    email:body.gmail
}) 
if(data==null){
  res.send("error! no credential found")
 } 
 console.log(data)  

  if(otp.code==num && Date.now()<otp.expiry){
      console.log("login started")
       let compare=await bcrypt.compare(body.password,data.password);
       console.log(compare)
       let flag=0;
         if(compare){
                flag=1;
                console.log("this is "+data)
            }  
    
    console.log(flag)
    if(flag==1){

      if(data.token==null){
        let dt=await db.updateOne({email:body.gmail,$set:{token:token}})
    res.send(`success!${token}`)
      }
      else{
      
        res.send(`success!${data.token}`)
      }
    }
    else{
        res.send("error in login");
       }
}
else{
  res.send("error! otp verification failed")
}
    }catch(err){
    res.send("oops");
}
    
   
}
exports.signup=async(req,res)=>{
    let body=req.body;
    let otp=Otp[body.gmail]
    let num=Number(body.otp)
    console.log(body)
    if(otp.code==num && Date.now()<otp.expiry){
      try{
    let hash=await bcrypt.hash(body.password,8)
    let data=await db.insertOne({email:body.gmail,password:hash})
    console.log(data)
    if(data!=null){
       console.log("signup succesfully")
        res.send("sign up succesfull");
    }
    else{
      console.log("error in signup")
    res.send("error in signup")
    }
  }catch(err){
     console.log("error in signup")
      res.send("error in signup")
  }
}else{
  res.send("error! wrong otp entered")
}
    
}
exports.profile=async(req,res)=>{
    try{
    cloudinary.config({ 
        cloud_name: 'dayvf7ugs', 
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
      });
      let bd=req.body;
      let body=JSON.parse(bd.form)
      let file=req.file;
      console.log(body);
      let filename=__dirname+"/uploads/"+bd.token;
    console.log(body)
    console.log(__dirname);
    fs.rename(file.path,filename,(err)=>{
        console.log(err)
    })
    let chk=await prf.findOne({usrid:bd.token})
    if(chk!=null){
    let res=await cloudinary.uploader.destroy(bd.token)
    console.log("deleted"+res)
    }
    console.log(fs.existsSync(filename))
      let result=await cloudinary.uploader.upload(filename,{
        unique_filename:true,
        use_filename:true,
        folder:"profiles",
        public_id:bd.token
      })
      console.log(result.secure_url);
      fs.unlink(filename,(err)=>{
        console.log(err);
      })
      let dt={
        userid:bd.token,
        name:body.name,
        bio:body.bio,
        contact:body.contact,
        profile:body.intrst,
        uri:result.secure_url,
        src:body.image
    }
      console.log(dt)
     if(chk!=null){
      let upd=await prf.updateOne({usrid:bd.mail},{$set:dt})
      console.log(upd)
      res.send("updated succesfully")
     }
     else{
    await prf.insertOne(dt)
    console.log(dt)
    res.send("done succesfully")
    
    }
  }catch(err){
        console.log(err);
    }
}
exports.pet=async(req,res)=>{
    try{
    cloudinary.config({ 
        cloud_name: 'dayvf7ugs', 
        api_key:'682215271415542',
        api_secret:"U6m71klfo3p3UfG3iGEIRW-6Hxo"
      });
      let bd=req.body;
      let body=JSON.parse(bd.form);
      let file=req.file;
      console.log(bd.token);
      let filename=__dirname+"/uploads/"+bd.token;
        console.log(body)
    console.log(__dirname);
    fs.rename(file.path,filename,(err)=>{
        console.log(err)
    })
    let chk=await pet.findOne({usrid:bd.token})
    if(chk!=null){
    let res=await cloudinary.uploader.destroy(bd.token)
    console.log("deleted"+res)
    }
    console.log(fs.existsSync(filename))
      let result=await cloudinary.uploader.upload(filename,{
        unique_filename:true,
        use_filename:true,
        folder:"pet",
        public_id:bd.token
      })
      console.log(result.secure_url);
      fs.unlink(filename,(err)=>{
        console.log(err);
      })
      let dt={
        userid:bd.token,
        petname:body.petnm,
        breed:body.breed,
        gender:body.gen,
         age:body.age,
        uri:result.secure_url,
        weight:body.wt,
        vaccinated:body.vacc,
        src:body.image
    }
      console.log(dt)
      if(chk!=null){
       let upd=await pet.updateOne({usrid:bd.mail},{$set:dt})
       console.log(upd)
       res.send("updated succesfully")
      }
      else{
     await pet.insertOne(dt)
     console.log(dt)
     res.send("done succesfully")
     
     }
    }catch(err){
        console.log(err);
    }
}
exports.get_data=async(req,res)=>{
  let parms=req.query.usr;
  console.log(parms)
  let pet_data=await pet.findOne({userid:parms}) 
  let usr_data=await prf.findOne({userid:parms})
  console.log(usr_data)
  let dt={pet:pet_data,user:usr_data}
  console.log(dt)
  res.send(JSON.stringify(dt))
}