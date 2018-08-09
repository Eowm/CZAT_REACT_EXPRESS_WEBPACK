const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UsersService = require('./UsersService');

const userService = new UsersService();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + 'index.html');
})

io.on('connection', function(socket){
	socket.on('join', function(name){
		userSerivce.addUser({
			id: socket.id,
			name
		});
		io.emmit('update', {
			users: userSerivce.getAllUsers()
		})
	})
	socket.on('disconnect', () => {
		userSerivce.removeUser(socket.id);
		socket.brodcast.emit('update', {
			users: userSerivce.getAllUsers()
		})
	})
	socket.on('message', function(message) {
		const {name} = userSerivce.getUserById(socket.id);
		socket.brodcast.emit('message', {
			text: message.text,
			from: name
		})
	})
})

server.listen(3000, function(){
	  console.log('listening on *:3000');
})