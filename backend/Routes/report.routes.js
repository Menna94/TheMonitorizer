const express= require('express'),
router = express.Router();

const { createReport } = require('../Controllers/report.controller');
const { auth } = require('../Middleware/auth.middleware');

//Create
//POST /api/reports/add-report
router.post('/add-report', auth, createReport);



module.exports = router;