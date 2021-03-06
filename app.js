#!/usr/bin/env node
var express = require('express');
var http = require('http');
var jade = require('jade');
var app = express();
var server = http.createServer(app)
var io = require('socket.io').listen(server);

var queue = []

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

app.get('/post', function(req, res) {
    io.sockets.emit('data', {'x': req.query.x, 'y': req.query.z, 'z': req.query.y})
    res.send(200);
});

app.get('/test', function(req, res) {
    for(var i=0; i<10; i++){
 io.sockets.emit("data", {"x":Math.random(),
              "y":Math.random(),
              "z":Math.random()})
    }
res.send(200);
});

// io.sockets.on('connection', function(socket){

//     socket.emit("data", queue)

//     socket.on('putData', function(data){
//        queue = queue.concat(data)
// 	   socket.emit("data", queue)
//     })

//     for(var i=0; i<100; i++){
// 	socket.emit("data", {"x":Math.random(),
// 			     "y":Math.random(),
// 			     "z":Math.random()})
//     }

// })
