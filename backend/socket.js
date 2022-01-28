let io;

module.exports = {
    init: httpServer =>{
        io = require('socket.io')(httpServer,{
            cors: {
                origin: "http://localhost:4200/api/checks/get",
                methods: ["GET", "POST"]
            },
            secure: true
        });
        return io;
    },
    getIO: () =>{
        if(!io){
            throw new Error('Socket.io is not initialized!');
        }
        return io;
    }
}