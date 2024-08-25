let username = prompt("Enter your username:");
const socket = io();
const print = document.getElementById("printdata");

document.getElementById("sendButton").addEventListener("click", function() {
    let val = document.getElementById('messageInput').value;
    if (val.trim() === '') return;

    socket.emit("chatMessage", { username: username, message: val });
    document.getElementById("messageInput").value = "";
});

socket.on("servermessage", function(data) {
    print.innerHTML += `<div>${data.username}: ${data.message}</div>`;
});


