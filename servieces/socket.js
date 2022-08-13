let io;

const initIO = (server)=>{
    io = require('socket.io')(server,{
        cors:"*"
    })
    return io;
}

const getIo = ()=>{
    if (!io) {
        console.log({message: "in-valid IO"});
    } else {
        return io;
    }
}
module.exports =  {initIO,getIo}