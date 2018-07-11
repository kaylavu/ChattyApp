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
    
        
    }

    
    

    onEnterContent(event) {
        if (event.keyCode == 13) {
        this.props.onNewMessage(this.state.content); 
        this.setState({content: ''})
        }
    }

    onChangeContent(event) {
        this.setState({content: event.target.value})
    }


    render() {

        return(
            <footer className = "chatbar" >
                    <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
                    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onChangeContent} onKeyUp={this.onEnterContent} value={this.state.content}/>
            </footer>
            )

    }

  }

  export default ChatBar; 