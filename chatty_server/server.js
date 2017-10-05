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


// Broadcast Function

const broadcast = (message) => {
  wss.clients.forEach((client) => {
    if(wss.readyState === wss.OPEN) {
    client.send(JSON.stringify(message));
    }
  });
}

// Count the number of Connections

let connectionCounter = 0;


// On connection update connection count, send initial connection message for user color,
// broadcast connection counter for 'user(s) online' message

wss.on('connection', (ws) =>{
  console.log('Client connected');
  connectionCounter = connectionCounter + 1;
  ws.send(JSON.stringify({type: 'initialConnection', connection: connectionCounter}));
  broadcast({type: 'connectionUpdate', connection: connectionCounter})


  // On message parse JSON

  ws.onmessage = function (event) {
    let message = JSON.parse(event.data);

    switch (message.type) {

      case 'postMessage': // On receiving a normal message
        let content = message.content;
        console.log(`User ${message.username} said ${content}`);

        // Function to check if message contains image

        function isImage(test) {
          return /(https?:\/\/.*\.(?:png|jpg))/i.test(test);
        }

        // Check to see if image in content and broadcast with appropriate type

        // If image:
        if (isImage(content)) {
          let contentArr = content.split(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig);
          let messageWithId = {type: 'imageMessage', id: uuid(), userColor: message.userColor, username: message.username, content: contentArr};
          broadcast(messageWithId);

        // If no image
        } else {
          let messageWithId = {type: 'incomingMessage', id: uuid(), userColor: message.userColor, username: message.username, content: message.content};
          broadcast(messageWithId);
        }
        break;

      case 'postNotification': // If a user updates name
        let notificationMessage = {type: 'incomingNotification', id: uuid(), content: message.content};
        broadcast(notificationMessage);
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
    }

  }
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    console.log('Client disconnected');
    connectionCounter = connectionCounter - 1;
    broadcast({type: 'connectionUpdate', connection: connectionCounter});

    }
  );
});

