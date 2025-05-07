import React, { useState } from 'react';
import '../styles/MessagesAndEmails.css';
import receptioniste from '../assets/receptioniste.png'; // Assurez-vous que ces images existent
import menage from '../assets/menage.jpg';
import compatible from '../assets/compatible.jpg';

const MessagesAndEmails = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Admin",
      content: "Bonjour, comment puis-je vous aider aujourd'hui?",
      timestamp: "10:30 AM",
      incoming: true
    },
    {
      id: 2,
      sender: "FemmeDeMenage",
      content: "J'ai terminé le ménage de la chambre 101.",
      timestamp: "10:45 AM",
      incoming: true
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState("Admin");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: "Receptionist",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        incoming: false
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simuler une réponse automatique du destinataire après 2 secondes
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: selectedContact,
          content: `Votre message a été reçu. Nous traiterons cela rapidement.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          incoming: true
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  return (
    <div className="chat-section">
      <div className="chat-container">
        <div className="contact-list">
          <div
            className={`contact ${selectedContact === "receptioniste" ? "active" : ""}`}
            onClick={() => setSelectedContact("receptioniste")}
          >
            <img src={receptioniste} alt="receptioniste" className="contact-avatar" />
            <div className="contact-info">
              <div className="contact-name">Paul Hugo</div>
              <div className="contact-status">En ligne</div>
            </div>
          </div>
          <div
            className={`contact ${selectedContact === "Responsable de service de menage" ? "active" : ""}`}
            onClick={() => setSelectedContact("Responsable de service de menage")}
          >
            <img src={menage} alt="Responsable de service de menage" className="contact-avatar" />
            <div className="contact-info">
              <div className="contact-name">Nadia Slimani</div>
              <div className="contact-status">En ligne</div>
            </div>
          </div>
          <div
            className={`contact ${selectedContact === "Responsable de service compatible" ? "active" : ""}`}
            onClick={() => setSelectedContact("Responsable de service compatible")}
          >
            <img src={compatible} alt="Responsable de service compatible" className="contact-avatar" />
            <div className="contact-info">
              <div className="contact-name">Thomas Moreau</div>
              <div className="contact-status">En ligne</div>
            </div>
          </div>
        </div>
        
        <div className="chat-area">
          <div className="chat-header">
            <div className="chat-info">
              <div className="chat-name">
                {selectedContact === "receptioniste" 
                  ? "Reseptioniste" 
                  : selectedContact === "Responsable de service de menage" 
                    ? "Responsable de service de menage" 
                    : "Responsable de service compatible"}
              </div>
              <div className="chat-status">En ligne</div>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages
              .filter(msg => msg.sender === selectedContact || msg.incoming === false)
              .map((msg) => (
                <div key={msg.id} className={`message ${msg.incoming ? 'message-incoming' : 'message-outgoing'}`}>
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                    <div className="message-timestamp">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="chat-input">
            <textarea
              className="message-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              rows="1"
            />
            <button className="send-button" onClick={handleSendMessage}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesAndEmails;