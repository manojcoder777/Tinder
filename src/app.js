const express=require("express")

const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello from test..");
});

app.use("/about",(req,res)=>{
    res.send("Hello from about..");
});

app.use("/",(req,res)=>{
    res.send("Hello from server..");
});

app.listen(3000);