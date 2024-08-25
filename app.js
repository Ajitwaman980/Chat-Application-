const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const usermodel = require('./model/index');
const http = require('http');
const ejs = require('ejs');
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io with the HTTP server
const io = socketio(server);

// EJS and public folder setups
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Define Socket.io connection handler
io.on('connection', (socket) => { 
    socket.on('chatMessage', async (data) => {
        try {
            const newMessage = new usermodel({ username: data.username, message: data.message });
            await newMessage.save();
            io.emit('servermessage', { username: data.username, message: data.message });
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

server.listen(8080);
