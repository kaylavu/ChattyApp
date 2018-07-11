import React, { Component } from 'react';

class ChatBar extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            username: this.props.currentUser
        }
    
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onEnterContent = this.onEnterContent.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onEnterUsername = this.onEnterUsername.bind(this)
    
        
    }

    onChangeContent(event) {
        this.setState({content: event.target.value})
    }
    

    onEnterContent(event) {
        if (event.keyCode == 13) {
        this.props.onNewMessage(this.state.content); 
        this.setState({content: ''})
        }
    }


    onChangeUsername(event) {
        //console.log("Hello changing username")
        this.setState({username: event.target.value})
    }

    onEnterUsername(event) {
        if(event.keyCode == 13) {
            this.props.onNewUsername(this.state.username);
            console.log("MY NAME HAS CHANGED")
        }
        
        
    }
    

    render() {

        return(
            <footer className = "chatbar" >
                    <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.onChangeUsername} onKeyUp={this.onEnterUsername} defaultValue={this.props.currentUser} />
                    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onChangeContent} onKeyUp={this.onEnterContent} value={this.state.content}/>
            </footer>
            )

    }

  }

  export default ChatBar; 