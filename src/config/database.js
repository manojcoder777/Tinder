const mongoose=require("mongoose");
const connectDB =async ()=>{
  await mongoose.connect(
    "mongodb://manojcoder777_db_user:Manoj@ac-knwzi0e-shard-00-00.hxk9wdn.mongodb.net:27017,ac-knwzi0e-shard-00-01.hxk9wdn.mongodb.net:27017,ac-knwzi0e-shard-00-02.hxk9wdn.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-p6ez1m-shard-0&authSource=admin&appName=Viji"
  );
};
module.exports = connectDB;
