const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    status:{
        type:String,
        required: true
    },
    availability:{
        type:Number,
        required: true
    },
    outages:{
        type:Number,
        required: true
    },
    downtime:{
        type:Number,
        required: true
    },
    uptime:{
        type:Number,
        required: true
    },
    responseTime:{
        type:Number,
        required: true
    },
    history:[{
        type:new mongoose.Schema({
            _id : mongoose.Schema.Types.ObjectId
        },{
            timestamps: true
        })
    }],
})




const Report = mongoose.model('Report', reportSchema);
module.exports = Report;