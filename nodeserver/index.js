//Node server with socket io connection


//take the socket.io for sending and receiving the messages
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
});

//to push the users(who joined the chat) in the empty object
const users={};


//to make the connection with the socket.io
io.on('connection', socket=>{
    //to take the users id
    socket.on('new-user-joined',name=>{
        //console.log("new user",name);
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);


    })
    //to sending and receiving the message
    socket.on('send', message=>{
        //when received
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    
    //when someone left the chat

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    });

})