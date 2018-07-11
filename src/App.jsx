import React, { Component } from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

var ids =require('short-id')



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id:1, 
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id:2, 
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onNewUsername = this.onNewUsername.bind(this)
    this.socket = new WebSocket(`ws://localhost:3001`)

  }



  componentDidMount() {
    this.socket.onopen = function (event) {
      console.log("Connected to Server!")
      //client.send("Here's some text that the server is urgently awai!"); 
    };
  }


  onNewMessage(content) {
    // const newMessage = {id: ids.generate(), username: this.state.currentUser.name, content: content}
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({messages: messages})
    const newMessage = {username: this.state.currentUser.name, content: content}
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
