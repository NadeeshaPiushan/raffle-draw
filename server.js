const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/organizer', (req, res) => {
    res.sendFile(__dirname + '/public/organizer.html');
});

app.get('/public', (req, res) => {
    res.sendFile(__dirname + '/public/public.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('startDraw', (tickets) => {
        const winner = tickets[Math.floor(Math.random() * tickets.length)];
        io.emit('drawResult', { winner });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
