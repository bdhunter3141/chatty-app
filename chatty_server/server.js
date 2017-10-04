// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


wss.on('connection', (ws) =>{
  console.log('Client connected');
  ws.onmessage = function (event) {
    let message = JSON.parse(event.data);
    let messageWithId;

    switch (message.type) {

      case 'postMessage':
        console.log(`User ${message.username} said ${message.content}`);
        messageWithId = {type: 'incomingMessage', id: uuid(), username: message.username, content: message.content};
        break;

      case 'postNotification':
        console.log(message.content);
        messageWithId = {type: 'incomingNotification', id: uuid(), content: message.content};
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
    }

    // Broadcast to everyone else.
    wss.clients.forEach((client) => {
      if(wss.readyState === wss.OPEN) {
      client.send(JSON.stringify(messageWithId));
    }
    });
  }
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
