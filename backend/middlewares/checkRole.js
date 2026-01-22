const checkRole = (allowedRoles) =>{
    return (req,res,next)=>{
        if(!req.userInfo){
            return res.status(403).json({error:true,message:"Access Denied: No user info"});
        }
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if(!roles.includes(req.userInfo.role) ){
            return res.status(403).json({error:true,message:"Access Denied: Unauthorized role"});
        }
        next();
    }
}

module.exports = {checkRole}