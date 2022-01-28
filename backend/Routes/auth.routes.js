const express= require('express'),
router = express.Router();

const {
    signUp, login
} = require('../Controllers/auth.controller');
const { auth } = require('../Middleware/auth.middleware');


//Signup
//POST /api/auth/signup
router.post('/signup', signUp);

//Login
//POST /api/auth/login
router.post('/login', login);

module.exports = router;