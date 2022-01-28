const User = require('../Models/user.model');
const CustomError = require('../Middleware/customError');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth:{
            api_key: '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'
        }
    })
    
)

//@desc     Signup
//@route    POST /api/auth/signup
//@access   public
exports.signUp = async(req,res,next)=>{
    try{
        const {
            fname,
            lname,
            email,
            pass
        } = req.body;
        
        const user = new User({
            fname,
            lname,
            email,
            pass
        });

        await user.save();

        const token = user.signJWT();

        transporter.sendMail({
            to: email,
            from: 'off.menna.ragab94@gmail.com',
            subject: 'Signup Succeeded',
            html: `
                <h1> You Successfully Signed up! </h1>
            `

        }).then(()=>{
            console.log('email sent');
        })
        .catch(err=>{
            console.log('error in sending email');
            console.log(err)
        })

        if(!user){
            return next(
                new CustomError(
                  'Error While Signing-up!',
                  400 
                )
            )
        }

        res.status(201).send({
            success:true,
            message: 'User Signed-up Successfully',
            data: user,
            token
        })
    }
    catch(err){
        return res.status(500).send({
            success:false,
            message: 'Internal Server Error While Signing-up',
            data: err.message
        })
    }
}


//@desc     Login
//@route    POST /api/auth/login
//@access   public
exports.login = async(req,res,next)=>{
    try{
        const {
            email,
            pass
        } = req.body;

        if(!email || !pass){
            return next(
                new CustomError(
                  'You Have To Provide Both: Email & Password!!',
                  400 
                )
            )
        }

        const user = await User.findOne({email}).select('+pass');
        if(!user){
            return next(
                new CustomError(
                  'Email Does Not Exist!',
                  404  
                )
            )
        }

        const matchedPass = await user.comparePass(pass);
        
        if(!matchedPass){
            return next(
                new CustomError(
                  'Entered Password Does Not Match!',
                  400  
                )
            )
        }

        const token = user.signJWT();

        res.status(201).send({
            success:true,
            message: 'User LoggedIn Successfully',
            data: user,
            token,
        })
    }
    catch(err){
        return next(
            new CustomError(
              'Internal Server Error While Logging-in!',
              500  
            )
        )
    }
}

