const Report = require('../Models/report.model');
const CustomError = require('../Middleware/customError');
const openSocket = require('socket.io-client');
const urlmon = require('url-monitor');

// const socket = openSocket('http://localhost:3000');
// const url = socket.on('create-check', data=>{
//     console.log('from client');
//     console.log(data);
//     return data;
// });




//@desc     Create
//@route    POST /api/reports/add-report
//@access   private/user
exports.createReport = async (req,res,next)=>{
    try{
    }
    catch(err){}
}