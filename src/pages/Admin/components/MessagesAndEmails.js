import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/MessagesAndEmails.css';
import receptioniste from '../assets/receptioniste.png';
import profilefemmenage from '../assets/menage.jpg';
import profilecomptable from '../assets/compatible.jpg';

const MessagesAndEmails = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('Receptionist');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState('');
  const chatEndRef = useRef(null);

  const contacts = [
    { name: 'Receptionist', label: 'Paul Hugo', avatar: receptioniste },
    { name: 'Housekeeper', label: 'Nadia Slimani', avatar: profilefemmenage },
    { name: 'Accountant', label: 'Thomas Moreau', avatar: profilecomptable },
  ];

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/user/Admin`);
      const filteredMessages = response.data.filter(
        msg =>
          (msg.sender === 'Admin' && msg.recipient === selectedContact) ||
          (msg.sender === selectedContact && msg.recipient === 'Admin')
      );
      setMessages(filteredMessages);
      setError(null);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Impossible de charger les messages. Veuillez réessayer.');
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedContact]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      setError('Veuillez entrer un message.');
      return;
    }

    const message = {
      sender: 'Admin',
      recipient: selectedContact,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/messages', message);
      setNewMessage('');
      setError(null);
      displaySuccessMessage('Message envoyé avec succès !');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Erreur lors de l\'envoi du message.');
    }
  };

  const handleEditMessage = async (messageId) => {
    if (!editContent.trim()) {
      setError('Le message modifié ne peut pas être vide.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/messages/${messageId}`, { content: editContent });
      setEditingMessage(null);
      setEditContent('');
      displaySuccessMessage('Message modifié avec succès !');
      fetchMessages();
    } catch (error) {
      console.error('Error editing message:', error);
      setError('Erreur lors de la modification du message.');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message ?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/messages/${messageId}`);
      displaySuccessMessage('Message supprimé avec succès !');
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Erreur lors de la suppression du message.');
    }
  };

  const openEditModal = (msg) => {
    setEditingMessage(msg.id);
    setEditContent(msg.content);
  };

  const closeEditModal = () => {
    setEditingMessage(null);
    setEditContent('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-section">
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="chat-container">
        <div className="contact-list">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className={`contact ${selectedContact === contact.name ? 'active' : ''}`}
              onClick={() => setSelectedContact(contact.name)}
            >
              <img src={contact.avatar} alt={contact.label} className="contact-avatar" />
              <div className="contact-info">
                <div className="contact-name">{contact.label}</div>
                <div className="contact-status">En ligne</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <div className="chat-info">
              <div className="chat-name">
                {contacts.find((c) => c.name === selectedContact)?.label || selectedContact}
              </div>
              <div className="chat-status">En ligne</div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.sender === 'Admin' ? 'message-outgoing' : 'message-incoming'
                }`}
              >
                <div className="message-bubble">
                  <p>{msg.content}</p>
                  <div className="message-timestamp">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                  {msg.sender === 'Admin' && (
                    <div className="message-actions">
                      <button
                        className="action-button edit-button"
                        onClick={() => openEditModal(msg)}
                      >
                        Modifier
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input">
            <textarea
              className="message-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              rows="1"
            />
            <button className="send-button" onClick={handleSendMessage}>
              Envoyer
            </button>
          </div>
        </div>
      </div>

      {editingMessage && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Modifier le message</h3>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Modifier votre message..."
              rows="4"
            />
            <div className="edit-modal-actions">
              <button
                className="button"
                onClick={() => handleEditMessage(editingMessage)}
              >
                Enregistrer
              </button>
              <button className="button cancel-button" onClick={closeEditModal}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesAndEmails;