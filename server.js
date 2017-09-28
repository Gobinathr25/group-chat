const express= require('express');
const path=require('path');
const bodyParser=require('body-parser');
const socketIO=require('socket.io');
const http=require('http');
var server=http.createServer(app);
var io= socketIO(server);

var app= express();
 var users=[];

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());

//app.engine('html',require('ejs').renderFile);

// app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
io.on('connection',(socket)=>{
    console.log("A new user connected to Client");
})
app.get('/chat',(req,res)=>{
    res.render('joinuser.html');
})






const port=process.env.PORT||4000;


app.listen(port,()=>{
    console.log('Server Intialiazed at',port)
});