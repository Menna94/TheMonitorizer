const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: [true, 'This Field Is Required'],
        minlength: [1, 'Your Name Cannot Consists Of Less Than 1 Character'],
        maxlength : [50, 'Your Name Cannot Consists Of More Than 50 Characters'],
    },
    lname:{
        type: String,
        required: [true, 'This Field Is Required'],
        minlength: [1, 'Your Family Name Cannot Consists Of Less Than 1 Character'],
        maxlength : [50, 'Your Family Name Cannot Consists Of More Than 50 Characters'],
    },
    email:{
        type: String,
        required: [true, 'This Field Is Required'],
        trim: true,
        lowercase: true,
        unique: true,
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    pass:{
        type: String,
        required: [true, 'This Field Is Required'],
    }
});


userSchema.pre('save', async function(next){
    this.pass = await bcrypt.hash(this.pass, 10);
    next();
});



//return jwt token
userSchema.methods.signJWT = function(){
    return JWT.sign(
        {   id: this._id } , 
        process.env.JWT_SECRET,
        {   expiresIn: process.env.JWT_EXPIRES_IN   }
    );
}

userSchema.methods.comparePass = async function(loginPass){
    return await bcrypt.compare(loginPass, this.pass);
}

const User = mongoose.model('User', userSchema);
module.exports = User;