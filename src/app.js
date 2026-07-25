const express=require("express")

const app=express();

app.get("/test/:userId/:Name/:department",(req,res)=>{
    console.log(req.params);
    res.send("Hello from test..");
});

app.post("/test",(req,res)=>{
    res.send("Hello from about..");
});

app.delete("/test",(req,res)=>{
    res.send("Hello from server..");
});

app.listen(3000);