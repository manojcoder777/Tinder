const express=require("express")

const app=express();

const {adminAuth,testAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);
app.use("/test",testAuth);

app.get("/admin/getUserData",(req,res)=>{
  res.send("data is sent");
});

app.get("/admin/deleteData",(req,res)=>{
  res.send("data is deleted");
});

app.get("/test/:userId/:Name/:department",(req,res,next)=>{
    next();
    console.log(req.params);
    
    },(req,res)=>{
        console.log("Manoj");
        res.send("Hello Manoj")
});

app.post("/test/about",(req,res)=>{
    try{
    throw new error("error from hello from about");
    res.send("Hello from about..");
    }catch(err){
        res.send("Something Occured Wrong When Calling The About Page");
    }
});

app.delete("/test/server",(req,res)=>{
    res.send("Hello from server..");
});

app.listen(3000);