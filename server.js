// express server initialization
const express= require('express');
const path=require('path');
const bodyParser=require('body-parser');
var app= express();
const users=[],ids=[];

 // socket.io initialization
const socketIO=require('socket.io');
const http=require('http');
var server=http.createServer(app);
var io= socketIO.listen(server);

// To render html files,.etc
app.use(express.static(__dirname+'/public'));
app.engine('html', require('ejs').renderFile);

// Body parser initialization
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());


// Socket server listening
io.on('connection',(socket)=> {
    console.log("A new user connected to Client");

 /*   socket.on('setUsername', function(data) {
        console.log(data);

        if(users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet', {username: data});
        }
    });


        socket.on('msg', function(data) {
            //Send message to everyone
            io.sockets.emit('newmsg', data);
        })*/
        //when receiving the data from the server, push the same message to client.
        socket.on("clientMsg", function (data) {
            //send the data to the current client requested/sent.
            socket.emit("serverMsg", data);
            //send the data to all the clients who are accessing the same site(localhost)
            socket.broadcast.emit("serverMsg", data);
        });

        socket.on("sender", function (data) {
            socket.emit("sender", data);
            socket.broadcast.emit("sender", data);
        });

        socket.on('disconnect', () =>{
        console.log('user disconnected');
        });
})


// Router initiatization
app.get('/chat',(req,res)=>{
    res.render('joinuser.html');
})


app.get('/sendMsg',(req,res)=>{
    res.render('chat.html');
})
/*var express = require('express');

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.listen(8080);*/


// Main server listening ......
const port=process.env.PORT||4000;

server.listen(port,()=>{
    console.log('Server Intialiazed at',port)
});