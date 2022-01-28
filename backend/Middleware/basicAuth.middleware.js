exports.basic = (user) => (req,res,next)=>{
    const username = user.email;
    const password = user.password;
    
    const auth = {
        username,
        password
    };

    


    next();
}