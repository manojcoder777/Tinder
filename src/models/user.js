const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
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
        lowercase:true,
          validate(value){
             if(!validator.isEmail(value)){
                throw new Error("Wrong Email"+value);
             }
           }
    },
    password:{
        type:String,
        required:true,
         validate(value){
             if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong"+value);
             }
           }
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
        default:"no photo",
         validate(value){
             if(validator.isURL(value)){
                throw new Error("invalid url "+value);
             }
           }
    },
    about:{
        type:String,
        default:"tell me about yourself"
    },
    skills:{
        type:[String],
    }
},{timestamps:true});


userSchema.methods.getJWT=async function (){
    const user=this;
    const token=await JsonWebTokenError.sign({_id:user._id},"DEV@Tinder$790",{
        expiresIn:"7d"
    });
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}



// const User=mongoosee.model("User",userSchema); and pass(we can create new instances for this(like object for user))
module.exports=mongoose.model("User",userSchema);





//s