// server.js

const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
      console.log("BROADCAST TO ALL CLIENTS", JSON.stringify(data));
    }
  })
}

wss.on('connection', (ws) => {
  let connectedUserCount = {
    type: 'incomingUserCount',
    numOfConnectedUsers: wss.clients.size
  }

  wss.broadcast(connectedUserCount)

  ws.on('message', function incoming(data) {
    const dataObj = JSON.parse(data);
    switch (dataObj.type) {
      case "postMessage":
        dataObj.id = uuidv1();
        dataObj.type = 'incomingMessage'
        console.log("RECEIVED FROM CLIENT", dataObj)
        break;
      case "postNotification":
        dataObj.type = "incomingNotification";
        dataObj.id = uuidv1(); 
        console.log("Received a Name Change Request")
        break;
      default:
        throw new Error("Cannot determine")
        console.log("postNotification to be handled")
    }
    wss.broadcast(dataObj);
  })

  ws.on('open', function (open) {
    console.log(open)
  })

  ws.on('close', () => {
      console.log('Client disconnected')
      connectedUserCount.numOfConnectedUsers = wss.clients.size
      wss.broadcast(connectedUserCount)
    }
  );

});