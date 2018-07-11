import React from 'react';
import Message from './Message.jsx'

export default function MessageList(props) {


    const messages = props.messages.map((message) => {
        return <Message key={message.id} userName={message.username} content={message.content} />
    });


    return (
        <main className="messages">
            {messages}
            <div className="message system">
                Anonymous1 change their name to nomnom. 
            </div>
        </main>
    )
}