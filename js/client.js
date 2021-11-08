//to connect with the server
const socket = io('http://localhost:8000');

// Get DOM elements in rthe varibales
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio 
var audio = new Audio('ring.mp3');

// Function which will append with the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}


// Ask new user for the name
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// If a new user joins,
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

// If someone sends a message,
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves the chat,
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

// If the form gets submitted,you send the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})