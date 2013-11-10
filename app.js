#!/usr/bin/env node
var express = require('express');
var http = require('http');
var jade = require('jade');
var app = express();
var server = http.createServer(app)
var io = require('socket.io').listen(server);

app.set('views', __dirname + "/views");
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.configure(function(){
    app.use(express.static(__dirname+"/public"))
});
app.get("/", function(req, res) {
    res.render('index.jade')
});
server.listen(3000);

io.sockets.on('connection', function(socket){
    socket.on('setPsuedo', function(data) {
	socket.set('psuedo', data);
    });

    socket.on('message', function(message) {
	socket.get('psuedo', function(error, name) {
	    var data = { 'message': message, psuedo : name };
	    socket.broadcast.emit('message', data);
	    console.log("user")
	})
    })
})
