const express=require("express")
const connectDB = require("./config/database")
const app=express();
const User=require("./models/user")

app.post("/signup", async (req,res)=>{
    const user=new User({
        firstName:"Manoj",
        lastName:"S",
        emailId:"manoj2410558@ssn.edu.in",
        password:"UtQ49FSE"
    });
    await user.save();
    res.send("User added successfully");
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

