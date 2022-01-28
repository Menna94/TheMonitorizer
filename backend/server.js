const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './Configs/config.env') })
const express= require('express'),
app = express(),
colors = require('colors'),
port = process.env.PORT || 3000;

//Rouers
const AuthRoutes = require('./Routes/auth.routes'),
UserRoutes = require('./Routes/user.routes'),
CheckRoutes = require('./Routes/check.routes'),
ReportRoutes = require('./Routes/report.routes');

//DB
const {dbConnection} = require('./Configs/db');
dbConnection();

//configs
app.use(express.json());

//cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
        'Access-Control-Allow-Methods',
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    )
    next()
})




//mount routers
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/checks', CheckRoutes);
app.use('/api/reports', ReportRoutes);

// Run Server
const server = app.listen(port, () => {
    console.log(`App listening on ${port}!`.black.bgBlue);
    
});
const io = require('./socket').init(server);
io.on('connection', socket =>{
    console.log('server connected');
})
io.on("connect_error", (err) => {  
    console.log(`connect_error due to ${err.message}`);
});