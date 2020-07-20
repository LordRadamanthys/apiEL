const socketio = require('socket.io')
var io
var connections = []

exports.setupWebSocket = (server) => {
    io = socketio(server)

    io.on('connection', socket => {
        connections.push({
            id:socket.id
        })
        // socket.on('init',(value)=>{
        //     console.log(value)
        // })

        // socket.emit('news',data)
    })

}

exports.sendMessage = (channel, data) => {
    io.emit(channel,data)
}