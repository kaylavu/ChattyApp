import React from 'react';
import Message from './Message.jsx'
import { Z_FILTERED } from 'zlib';


export default function MessageList(props) {


    const messages = props.messages.map((message) => {
        
        switch(message.type) {
            case "incomingMessage":
            // const wordsArray = message.content.split(' ')
            // const wordsResult = wordsArray.filter(word => )
            // console.log(wordsArray)
                return <Message key={message.id} userName={message.username} content={message.content} color= {message.color} />
            case "incomingNotification": 
                return <div className="notification" key={message.id}>
                <span className="notification-content"> {message.content} </span>
                </div>
        } 
     });

  
    return (
        <main className="messages">
            {messages}
        </main>
    )
}