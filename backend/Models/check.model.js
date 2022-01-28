const mongoose = require('mongoose');


const checkSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    protocol:{
        type: String,
        required: true,
        enum:[
            'HTTP',
            'HTTPS',
            'TCP'
        ]
    },
    path:{
        type: String,
        // required: true
    },
    port:{
        type: Number,
        // required: true
    },
    webhook:{
        type: String,
        // required: true
    },
    timeout:{
        type: Number,
        // required: true,
        default: 5
    },
    interval:{
        type: Number,
        // required: true,
        default: 10
    },
    threshould:{
        type: Number,
        required: true,
        default: 1
    },
    authentication:{
        username:{
            type: String,
        required: true
        },
        password:{
            type: String,
            required: true
        },
        // hhtpHeaders:[{
        //     key:{
        //         type: String,
        //     },
        //     pass:{
        //         type: String,
        //         required: true
        //     }, 
        // }]
    },
    assert:{
        statusCode:{
            type:Number
        },
    },
    tags:{
        type: [String]
    },
    ignoreSSL:Boolean,
});

const Check = mongoose.model('Check', checkSchema);
module.exports = Check;