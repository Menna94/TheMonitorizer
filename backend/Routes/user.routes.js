const express= require('express'),
router = express.Router();

const { getUsers, delUser, getUser } = require('../Controllers/user.controller');
const { auth } = require('../Middleware/auth.middleware');


//Fetch     All Users
//GET       /api/users
router.get('/', auth, getUsers);


//Fetch     Single User
//GET       /api/users/:uid
router.get('/:uid', getUser);


//Delet     A User
//DELETE    /api/users/:uid
router.delete('/:uid', delUser);

module.exports = router;