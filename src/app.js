const express=require("express")
const connectDB = require("./config/database")
const app=express();
const User=require("./models/user")
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser")
const jwt =require("jsonwebtoken")
const {userAuth}=require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());;


app.post("/signup", async (req,res)=>{
  try{
  //validation of data
    validateSignUpData(req);
    const {firstName,lastName,emailId,password}=req.body;
  // Encrypt the password
    const passwordHash=await bcrypt.hash(password,10);
    const user=new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });
    await user.save();
    res.send("User added succesfully");}
    catch(err){
      res.status(400).send("Error:"+err.message);
    }
  
});
app.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid=await user.validatePassword(password);
    if(isPasswordValid){

      // create jwt token
      const token=await user.getJWT();

      //add the token to cookie and send the response back to the user

      res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
      res.send("Login Successfully");
    }else{
      throw new Error("Invalid credenttials");
    }
  }catch(err){
    res.status(400).send("Error : "+err.message);
  }
});
app.get("/profile",userAuth,async(req,res)=>{
  try{
    const user=req.user;
    if(!user){
      throw new Error("user not exists");
    }
  }catch(err){
    res.status(400).send("ERROR : "+err.message);
  }
});
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;

  //sendig connection request
  console.log("connection request");
  res.send(user.firstName+"sent the connection request");
});
connectDB()
  .then(()=>{
    console.log("Connected to the database");
    app.listen(3000,()=>{
    console.log("server is listening successfully on port 3000");
});
  })
  .catch((err) => {
    console.log("Cannot connect to the database");
  });

