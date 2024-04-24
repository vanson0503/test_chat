const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

io.on('connection',(socket)=>{
    console.log('user connected')

    socket.on('chat message', (message) => {
        console.log('Message from client:', message);
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        io.emit('chat message', 'User disconnected');
    });
})

server.listen(3000,()=>{
    console.log("Listening on port 3000")
})