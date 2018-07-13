import React from 'react';
export default function Message(props) {

    return(
      <div className="message">
        <span className="message-username" style={{color:props.color}}> {props.userName }</span>
        <span className="message-content" className='speech-bubble'>{props.content}</span>
      </div>
    )
  }