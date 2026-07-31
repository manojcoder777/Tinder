const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50,
    },
    lastName:{
        type:String 
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String ,
        validate(value){
            if(!["male","female","others".includes(value)]){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"no photo"
    },
    about:{
        type:String,
        default:"tell me about yourself"
    },
    skills:{
        type:[String],
    }
},{timestamps:true});
// const User=mongoosee.model("User",userSchema); and pass(we can create new instances for this(like object for user))
module.exports=mongoose.model("User",userSchema);