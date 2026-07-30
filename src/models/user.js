const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String 
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String 
    }
});
// const User=mongoosee.model("User",userSchema); and pass(we can create new instances for this(like object for user))
module.exports=mongoose.model("User",userSchema);