const Check = require('../Models/check.model');
const CustomError = require('../Middleware/customError');
const openSocket = require('socket.io-client');
const socket = require('../socket');
const axios = require('axios').default;
const { poll } = require('../Middleware/pollingRequests.middleware');
const User = require('../Models/user.model');
//@desc     Create
//@route    POST /api/checks/add-check
//@access   private/user
exports.createCheck = async (req,res,next)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        console.log(user.email, user.pass);
        const authentication = {
           username: user.email,
           password: user.pass
        }

        const {
            name,
            url,
            protocol,
            path,
            port,
            webhook,
            timeout,
            interval,
            threshould,
            assert,
            tags,
            ignoreSSL
        } = req.body;
    
        const check = new Check({
            name,
            url,
            protocol,
            path,
            port,
            webhook,
            timeout,
            interval,
            threshould,
            authentication,
            assert,
            tags,
            ignoreSSL
        });
    
        await check.save();

        poll(check);
    
        if(!check){
            return next(
                new CustomError(
                    'Error While Creating New Check',
                    400
                )
            )
        }
        res.status(201)
        .send({
            success:true,
            message: 'Check Created Successfully',
            data: check
        })
    }
    catch(err){
        return res.status(500).send({
            success:false,
            message: 'Internal Server Error While Creating New Check',
            data: err.message
        })
    }
    

}

// exports.delAll= async(req,res,next)=>{
//     await Check.deleteMany().then(()=>{
//         console.log('deleted');
//     }).catch(err=>{console.log(err)});
// }


//@desc     Fetch All Checks
//@route    GET /api/checks
//@access   private/user
exports.getChecks = async (req,res,next)=>{
    try{
        const checks = await Check.find({});

        if(!checks){
            return next(
                new CustomError(
                    'Error While Creating New Check',
                    400
                )
            )
        }

        res.status(200).send({
            success:true,
            message: 'Checks Fetched Successfully',
            count: checks.length,
            data: checks
        })
    }
    catch(err){
        return res.status(500).send({
            success:true,
            message: 'Internal Server Error While Fetching Checks!',
            data: err.message
        })
    }
}
