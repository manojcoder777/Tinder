
const userAuth = async(req,res,next) =>{
    // read the token from the req cookies
    //validate the token
    // find the user 
    try{
        const {emailId,password}=req.body;
        const user =await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentails");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            //create jwt token
            const token =await JsonWebTokenError.sign({_id:user._id},"DEV@Tinder$790");
            //Add the token to cookie and send the response back to user
            res.cookie("token",token);
            res.send("Login Successfull");
        }else{
            throw new Error("Invalid credentials");
        }
        req.user=user;
        next();
    }catch(error){
        res.status(400).send("Error : "+err.message);
    }
}
module.exports = {
    userAuth
};