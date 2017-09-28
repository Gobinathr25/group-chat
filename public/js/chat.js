/*

var socket = io.connect("http://localhost:4000");

socket.on('connect',()=>{
    console.log('A new user connected to server')
})

socket.on('showName',(username) =>{
    console.log(username,"SERN MESSAGE")
})

function getUsername(){
    var socket=io();
    alert('started')
    var user= document.getElementById('userId').value;
    console.log(user)
    socket.emit('addUser',user);
    window.location.href = '/sendMsg';

/!*    $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/sendMsg',
        data: {
            user: user
        },
        success: function (result) {
            console.log(" :::::::RESULT ::::",result)
        },
        error: function (err) {
            console.log(err)
        }
    });*!/

}*/


var name,
    socket = io.connect("http://localhost:4000");
$(function () {
    //as the user to enter their nick name or name.
    name = window.prompt("enter your name");
    //If the name is not given, ask the user to enter once again
    if (name == null) {
        $("body").html(" please refresh the page and try again ");
    }
    //When send button is clicked on, send the message to server
    $("#send").click(function () {
        //send to the server with person name and message
        socket.emit("clientMsg", {
            "name": name,
            "msg": $("#msg").val()
        });
    });

    //After sending message to the server, we'll have to wire up the event for it.
    //We can do the following. Upon receiving the message print it to the message box
    //that we've created in our html
    socket.on("serverMsg", function (data) {
        //Append the message from the server to the message box
        $("#msgBox").append("<strong>" + data.name +
            "</strong>: " + data.msg + "<br/>");
    });

    $("#msg").on("keyup", function (event) {
        socket.emit("sender", {
            name: name
        });
    });

    socket.on("sender", function (data) {
        $("#status").html(data.name + " is typing");
        setTimeout(function () {
            $("#status").html('');
        }, 3000);
    });
});