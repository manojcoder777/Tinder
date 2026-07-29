const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting checked ");
    const token="XYZ";
    const isAdminAuhtorized=token==="XYZ";
    if(!isAdminAuhtorized){
        res.status(401).send("UnAuthorized");
    }else{
        next();
    }
}
const testAuth = (req,res,next) =>{
    console.log("User auth is getting checked ");
    const token="XYZ";
    const isTestAuhtorized=token==="XYZ";
    if(!isTestAuhtorized){
        res.status(401).send("UnAuthorized");
    }else{
        next();
    }
}
module.exports = {
    adminAuth,
    testAuth
};