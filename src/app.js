const express=require("express")
const connectDB = require("./config/database")
const app=express();
const User=require("./models/user")
app.use(express.json());
app.post("/signup", async (req,res)=>{
    console.log(req.body);
    const user=new User(req.body);
    await user.save();
    res.send("User added successfully");
});
app.get("/user",async(req,res)=>{
   const userEmail=req.body.emailId;
   try{
    await User.find({emailId:userEmail});
    res.send("Succesfully fetched");
   }catch(err){
    res.status(404).send("something went wrong");
   }
});
app.get("/feed",async(req,res)=>{
   try{
    const users=await User.find({});
    console.log(users)
    res.send("Succesfully feed is fetched");
   }catch(err){
    res.status(404).send("something went wrong");
   }
});
app.get("/find",async(req,res)=>{
  try {
    const userEmail=req.body.emailId;
    console.log(userEmail);
    const user=await User.findOne({emailId:userEmail});
    if(user!==null){
      console.log(user)
     res.send(user);
    }else{
      res.send("user not found")
    }
  }catch(err){
    res.status(404).send("something went wrong");
  }
});
app.delete("/user",async(req,res)=>{
   const userId=req.body.userId;
   try{
    await User.findByIdAndDelete(userId);
    res.send("Succesfully Deleted");
   }catch(err){
    res.status(404).send("something went wrong");
   }
});
app.patch("/user",async(req,res)=>{
   const userEmailId=req.body.emailId;
   const data=req.body;
   try{
    const user=await User.findOneAndUpdate({emailId:userEmailId},data,{returnDocument:"before",runValidators:true});
    console.log(user);
    res.send("Succesfully Updated");
   }catch(err){
    res.status(404).send("Update error"+err.message);
   };
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

