
const jwt=require('jsonwebtoken');
const User =require('../models/adminModels');




const adminAuthentication= async (req,res,next)=>{
try{
    
    const token=req.cookies.jwtoken;
    const verifyToken = jwt.verify(token,process.env.JWT_PASS) ;
    const role = verifyToken.role;
    const rootuser = verifyToken.user;
    
    if(!rootuser){
        throw new Error("Admin not found")
        
    }
    if(role==="user")
    {
        throw new Error("Restricted for admin only");
    }
    req.role=role;
    req.token=token;
    req.rootuser=rootuser;
    req.rootuserId=rootuser._id;
    
    next();
     
}catch(err){
     
    res.status(401).send('Unauthorized : Not Token provided')
    
}


}



module.exports= adminAuthentication;