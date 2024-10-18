const socket = io(); // Connect to the server

document.getElementById('send').onclick = () => {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    
    // Emit join event if the user is new
    if (username) {
        socket.emit('join', username); // Emit join event
    }
    
    if (message) {
        socket.emit('sendMessage', message); // Emit send message event
        document.getElementById('message').value = ''; // Clear the input after sending
    }
};

// Listen for incoming messages
socket.on('message', (data) => {
    const li = document.createElement('li');
    li.textContent = `${data.username}: ${data.text}`;
    document.getElementById('messages').appendChild(li);
});

// Listen for user list updates
socket.on('userList', (userList) => {
    console.log('Current users:', userList); // You can update the UI with the user list
});
