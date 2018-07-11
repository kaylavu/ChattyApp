import React, { Component } from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import { testBasicHash } from 'sechash';
const uuidv1 = require('uuid/v1')

console.log(window); 




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
    // console.log(event.data)
    const newMessage = JSON.parse(event.data)
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages}) 
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
    const newMessage = {id:uuidv1(), username: this.state.currentUser.name, content: content}
    this.socket.send(JSON.stringify(newMessage))
    
  }
  
  onNewUsername(name) {
    console.log("new username to be implemented")
    this.setState({currentUser: {name:name}})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage} onNewUsername={this.onNewUsername}/>
      </div>
    );
  }
}
export default App;
