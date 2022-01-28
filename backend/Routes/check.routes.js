const express= require('express'),
router = express.Router();

const { createCheck, delAll, getChecks } = require('../Controllers/check.controller');
const { auth } = require('../Middleware/auth.middleware');

//Create
//POST /api/checks/add-check
router.post('/add-check', auth, createCheck);

// router.delete('/delAll', delAll)
//Fetch All Checks
//GET /api/checks
router.get('/', getChecks);


module.exports = router;