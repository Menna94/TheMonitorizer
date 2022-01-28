const colors = require('colors');

class CustomError extends Error{
    constructor(message, statusCode){
        super(message.red.underline);
        this.statusCode = statusCode;
    }
}

module.exports = CustomError