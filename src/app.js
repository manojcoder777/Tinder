const express=require("express")

const app=express();

app.get("/test/:userId/:Name/:department",(req,res,next)=>{
    next();
    console.log(req.params);
    
    },(req,res)=>{
        console.log("Manoj");
        res.send("Hello Manoj")
});

app.post("/test",(req,res)=>{
    res.send("Hello from about..");
});

app.delete("/test",(req,res)=>{
    res.send("Hello from server..");
});

app.listen(3000);