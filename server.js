const express= require('express');
const path=require('path');
const bodyParser=require('body-parser');

var app= express();
var requiredPath=path.join(__dirname,'./public/');

app.use(express.static(requiredPath));
app.use(bodyParser.json())

const port=process.env.PORT||3000;


app.listen(port,()=>{
    console.log('Server Intialiazed at',port)
});