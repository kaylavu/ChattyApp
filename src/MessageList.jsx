import React from 'react';
import Message from './Message.jsx'


export default function MessageList(props) {


    const messages = props.messages.map((message) => {
        //console.log(message.type);
        switch(message.type) {
            case "incomingMessage":
                return <Message key={message.id} userName={message.username} content={message.content} />
            case "incomingNotification": 
                return <div className="notification" key={message.id}>
                <span className="notification-content">{message.oldUsername} changed their name </span>
                </div>
        } 
     });

  
    return (
        <main className="messages">
            {messages}
        </main>
    )
}