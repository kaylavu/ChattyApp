import React from 'react';
import Message from './Message.jsx'


export default function MessageList(props) {


    const messages = props.messages.map((message) => {
        console.log(message.type);
        switch(message.type) {
            case "incomingMessage":
                return <Message key={message.id} userName={message.username} content={message.content} />
        } 
     });

     const notification = props.messages.map((message) => {
       console.log("rohit ",message);
        switch(message.type) {
            case "incomingNotification": 
                return (
                   <div>
                     <h1>This is only for test</h1>
                    </div>
                )
            } 
     });
    return (
        <main className="messages">
            {messages}
            <div className="notification">
                {notification}
            </div>
        </main>
    )
}