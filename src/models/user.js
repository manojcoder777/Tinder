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
        default:"https://www.google.com/imgres?q=default%20photo%20with%20white&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F028%2F228%2F271%2Fnon_2x%2Fdefault-avatar-profile-line-icon-isolated-on-white-background-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F28228271-default-avatar-profile-line-icon-vector-isolated-on-white-background&docid=iO5B4B_YUdmGDM&tbnid=a8kAg6QSjL5C5M&vet=12ahUKEwimuaq41vyWAxW7S3ADHQdnF24QnPAOegQIIBAA..i&w=980&h=980&hcb=2&ved=2ahUKEwimuaq41vyWAxW7S3ADHQdnF24QnPAOegQIIBAAhttps://www.google.com/imgres?q=default%20photo%20with%20white&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F2041572395%2Fvector%2Fblank-avatar-photo-placeholder-icon-vector-illustration.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DwSuiu-si33m-eiwGhXiX_5DvKQDHNS--CBLcyuy68n0%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fdefault-profile-image&docid=nMZrOR9fJXjM2M&tbnid=JPv11hC5wsgCXM&vet=12ahUKEwidqNDY2vyWAxWuS2wGHb5mGkwQnPAOegUIjwMQAA..i&w=612&h=612&hcb=2&ved=2ahUKEwidqNDY2vyWAxWuS2wGHb5mGkwQnPAOegUIjwMQAA",
         validate(value){
             if(!validator.isURL(value)){
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


userSchema.index({firstName:1,lastName:1});

userSchema.methods.getJWT=async function (){
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",{
        expiresIn:"7d"
    });
    return token;
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}



// const User=mongoosee.model("User",userSchema); and pass(we can create new instances for this(like object for user))
const User=mongoose.model("User",userSchema);
 
module.exports=User;




//s