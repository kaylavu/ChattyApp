import React from 'react';
import Message from './Message.jsx'

export default function MessageList() {
    return (
  <main className="messages">
   <Message/>
    <div className="message system">
      Anonymous1 changed their name to nomnom.
    </div>
  </main>
    )
  }