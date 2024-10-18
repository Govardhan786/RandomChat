// Connect to the Socket.IO server hosted on Vercel
const socket = io('https://random-chat-cro4f15u7-govardhans-projects.vercel.app/'); // Replace with your Vercel app URL

// Function to handle joining the chat
document.getElementById('join').onclick = () => {
    const username = document.getElementById('username').value;
    socket.emit('join', username); // Emit join event with the username
};

// Listen for the updated user list
socket.on('userList', (users) => {
    console.log('Current users:', users); // Log the current user list
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = ''; // Clear the existing user list
    users.forEach(user => {
        userListDiv.innerHTML += `<p>${user}</p>`; // Add each user to the list
    });
});

// Listen for incoming messages
socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.text}</p>`; // Display messages
});

// Function to send messages
document.getElementById('send').onclick = () => {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    socket.emit('sendMessage', message); // Emit message event
    messageInput.value = ''; // Clear the input after sending
};

// Function to send private messages (optional)
document.getElementById('sendPrivate').onclick = () => {
    const recipient = document.getElementById('recipient').value;
    const privateMessageInput = document.getElementById('privateMessage');
    const privateMessage = privateMessageInput.value;
    socket.emit('privateMessage', { to: recipient, message: privateMessage }); // Emit private message event
    privateMessageInput.value = ''; // Clear the input after sending
};

// Optionally handle receiving private messages (not displayed in this example)
socket.on('privateMessage', (data) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p><strong>${data.from} (private):</strong> ${data.text}</p>`; // Display private messages
});
