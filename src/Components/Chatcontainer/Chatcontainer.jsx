import React from 'react';
import './chatcontainer.css'; // Import your CSS file for styling

const Chatcontainer = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((msg, i) => (
        <div 
          key={i} 
          className={`message ${msg.fromSelf ? 'message-right' : 'message-left'}`}
        >
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chatcontainer;
