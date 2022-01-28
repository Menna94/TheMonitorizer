const User = require('../Models/user.model');
const CustomError = require('../Middleware/customError');


//@desc     Fetch Single User
//@route    GET /api/users/:uid
//@access   public
exports.getUser = async(req,res,next)=>{
    try{
        const id = req.params.uid;
        const user = await User.findById(id);

        if(!user){
            return next(
                new CustomError(
                  'Requested User Is Not Found!',
                  404 
                )
            )
        }

        res.status(200).send({
            success:true,
            message: 'User Fetched Successfully',
            data: user
        })
    }
    catch(err){
        return next(
            new CustomError(
              'Internal Server Error While Fetching A User!',
              500  
            )
        )
    }
}



//@desc     Fetch All Users
//@route    GET /api/users
//@access   public
exports.getUsers = async(req,res,next)=>{
    try{
        const users = await User.find();

        if(!users){
            return next(
                new CustomError(
                  'Users Are Not Found!',
                  404  
                )
            )
        }

        res.status(200).send({
            success:true,
            message: 'Users Fetched Successfully',
            count: users.length,
            data: users
        })
    }
    catch(err){
        return next(
            new CustomError(
              'Internal Server Error While Fetching Users',
              500  
            )
        )
    }
}



//@desc     Delete A User
//@route    DELETE /api/users/:uid
//@access   public
exports.delUser = async(req,res,next)=>{
    try{
        const id= req.params.uid,
        user = await User.findById(id);

        if(!user){
            return next(
                new CustomError(
                  'There Is No User With The Provided ID!',
                  404 
                )
            )
        }

        const delUser = await User.findByIdAndRemove(id);

        if(!delUser){
            return next(
                new CustomError(
                  'Error While Deleting The User!',
                  400 
                )
            )
        }
        const users = await User.find();
        res.status(200).send({
            success:true,
            message: 'User Deletd Successfully',
            count: users.length,
            data: users
        })
    }
    catch(err){
        return next(
            new CustomError(
              'Internal Server Error While Deleting The User',
              500  
            )
        )
    }
}
