import React, { useState, useEffect } from 'react';
import '../styles/MessagesAndEmails.css';

const MessagesAndEmails = () => {
  // États pour gérer les messages et le nouveau message
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Employé par défaut
  const defaultEmployee = {
    id: 1,
    name: 'Anita Mahre',
    role: 'Réceptioniste',
  };

  // Charger les messages initiaux
  useEffect(() => {
    const demoMessages = [
      { id: 1, sender: 'admin', text: 'Bonjour, comment puis-je vous aider?', time: '10:00 AM' },
      { id: 2, sender: 'employee', text: 'J\'ai un problème avec le nouveau projet.', time: '10:05 AM' },
      { id: 3, sender: 'admin', text: 'Dites-moi en quoi je peux vous aider.', time: '10:10 AM' },
    ];
    setMessages(demoMessages);
  }, []);

  // Envoyer un nouveau message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'admin',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simuler une réponse automatique
    setTimeout(() => {
      const autoReply = {
        id: messages.length + 2,
        sender: 'employee',
        text: 'Merci pour votre réponse, je vais regarder ça.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  return (
    <div className="chat-app">
      {/* Zone de conversation principale */}
      <div className="chat-container">
        <div className="chat-header">
          <h3>Conversation avec {defaultEmployee.name}</h3>
          <p>{defaultEmployee.role}</p>
        </div>

        <div className="messages-container">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'admin' ? 'admin-message' : 'employee-message'}`}
            >
              <p>{message.text}</p>
              <span className="message-time">{message.time}</span>
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesAndEmails;