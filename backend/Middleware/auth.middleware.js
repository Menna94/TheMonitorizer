const JWT = require('jsonwebtoken');
const User = require('../Models/user.model');
const CustomError = require('./customError');

exports.auth = async(req, res,next)=>{
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(' ')[1];
        }
        
        if(!token){
            return next(
                new CustomError(
                  'You Are Not Authorized To Access This Route!',
                  401  
                )
            )
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
    
        next();
    }
    catch(err){
        return next(
            new CustomError(
              'You Are Not Authorized To Access This Route!',
              500  
            )
        )
    }
    
}
