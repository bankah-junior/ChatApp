var express = require("express");
var socket = require("socket.io");
const morgan = require("morgan")

var app = express();

var server = app.listen(4000, () => {
    console.log("Listening to request on port 4000");
});

app.use(morgan('dev'));
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection');

    // Getting the data from the frontend
    socket.on('chat', (data) => {
        // sending the message to all connected to the server
        io.sockets.emit('chat', data);
    });

    // Displaying on other screen 'user is typing'
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});