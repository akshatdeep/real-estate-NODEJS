exports.isLoggedIn=(req, res, nest)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.send("Log in to access the resource.");
    }
}