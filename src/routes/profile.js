const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view",userAuth,async(req,res)=>{

  try{
    const user=req.user;
    if(!user){
      throw new Error("user not exists");
    }
  }catch(err){
    res.status(400).send("ERROR : "+err.message);
  }
});

profileRouter.patch("profile/edit",userAuth,async(req,res)=>{

  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request");
    }


    const loggedInUser=req.user;
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    await loggedInUser.save();

    res.json({
      message:`${loggedInUser.firstName},your profile has been updated successfully`,
      data:loggedInUser,
    });

    
  }catch(err){ 
    
    res.status(400).send("Error : "+err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new Error("Old password and new password are required");
    }

    const loggedInUser = req.user;

    // Compare old password with hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      loggedInUser.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Old password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    loggedInUser.password = hashedPassword;

    await loggedInUser.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});


module.exports = profileRouter;