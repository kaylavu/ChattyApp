import React, { Component } from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import { testBasicHash } from 'sechash';
const uuidv1 = require('uuid/v1')


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numOfConnectedUsers: 0,
      currentUser: { name: "Anonymous", color: getRandomColor() }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      ]
    };
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onNewUsername = this.onNewUsername.bind(this)
    this.socket = new WebSocket(`ws://localhost:3001`)
    this.onMessage = this.onMessage.bind(this)
  }

  onMessage(event) {
    const newMessage = JSON.parse(event.data)
    const messages = this.state.messages.concat(newMessage)
    switch (newMessage.type) {
      case "incomingMessage":
        this.setState({ messages: messages })
        break;
      case "incomingNotification":
        this.setState({ messages: messages })
        console.log("CURRENT USER", this.state.currentUser)
        break;
      case "incomingUserCount":
        this.setState({ numOfConnectedUsers: newMessage.numOfConnectedUsers })
        console.log("SET APP STATE USER COUNT:", this.state.numOfConnectedUsers)
        break;
      default:
        throw new Error("Unknown Event Type");
    }
  }

  componentDidMount() {
    this.socket.onopen = function (event) {
      console.log("Connected to Server!")
    };
    this.socket.onmessage = this.onMessage;
  }


  onNewMessage(content) {
    const newMessage = { type: "postMessage", username: this.state.currentUser.name, content: content, color: this.state.currentUser.color }
    this.socket.send(JSON.stringify(newMessage))
  }

  onNewUsername(name) {
    let newName = { type: "postNotification", oldUsername: this.state.currentUser.name, newUsername: name, content: `${this.state.currentUser.name} changed their name to ${name}` };
    this.setState(prevState => ({ currentUser: { name: name, color: prevState.currentUser.color } }))
    this.socket.send(JSON.stringify(newName))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-user-count"> {this.state.numOfConnectedUsers} Users Online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage} onNewUsername={this.onNewUsername} />
      </div>
    );
  }
}
export default App;
