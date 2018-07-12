import React, { Component } from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import { testBasicHash } from 'sechash';
const uuidv1 = require('uuid/v1')






class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      ]
    };
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onNewUsername = this.onNewUsername.bind(this)
    this.socket = new WebSocket(`ws://localhost:3001`)
    this.onMessage = this.onMessage.bind(this)


  }

  onMessage(event) {
    // console.log("HOW TO HANDLE THE MESSAGE:", event.data)
    const newMessage = JSON.parse(event.data)
    const messages = this.state.messages.concat(newMessage)
    console.log(messages);
    switch (newMessage.type) {
      case "incomingMessage":
      
      this.setState({ messages: messages })
        console.log("MESSAGE HANDLED BY USER", event.data)
        break;
      case "incomingNotification": 

        this.setState({currentUser:{name:newMessage.newUsername}, messages: messages })
        console.log("CURRENT USER", this.state.currentUser)
        break; 
      default:
        throw new Error("Unknown Event Type"); 
    }


  }

  componentDidMount() {
    this.socket.onopen = function (event) {
      console.log("Connected to Server!")
      //client.send("Here's some text that the server is urgently awai!"); 
    };
    // this.socket.onmessage = (event) => {                                fixing the binding error using fat arrrow method 
    //   // console.log(event.data)
    //   const newMessage = JSON.parse(event.data)
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({messages: messages}) 
    // }
    this.socket.onmessage = this.onMessage;            // Think: Why was it this.socket.onmessage = this.onMessage and NOT this.onMessage(); 

  }


  onNewMessage(content) {
    // const newMessage = {id: ids.generate(), username: this.state.currentUser.name, content: content}
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({messages: messages})
    const newMessage = { type: "postMessage", username: this.state.currentUser.name, content: content }
    this.socket.send(JSON.stringify(newMessage))

  }

  onNewUsername(name) {
    //console.log("new username to be implemented")

    let newName = { type: "postNotification", oldUsername: this.state.currentUser.name, newUsername: name };
    this.socket.send(JSON.stringify(newName))
    // this.setState({currentUser: {name:name}})
    // const newUsername = {type:"postNotification", } 
    // this.socket.send(JSON.stringify(newUsername))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage} onNewUsername={this.onNewUsername} />
      </div>
    );
  }
}
export default App;
