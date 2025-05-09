import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMoneyCheckAlt,
  FaReceipt,
  FaPlus,
  FaTrash,
  FaFileExport,
  FaSearch,
  FaEnvelope,
  FaPaperPlane,
  FaEdit
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import profilecomptable from "../assets/profilecompatible.webp";
import profilereceptioniste from "../assets/profilereceptioniste.webp";
import admin from "../assets/admin.jpg";
import profilefemmenage from "../assets/profilefemmemenage.webp";
import "../Style/accounting.css";

const PAYMENT_METHODS = [
  "Espèce",
  "Carte bancaire",
  "Virement bancaire",
  "Portefeuille électronique",
  "Chèque",
  "Paiement à l'arrivée",
  "Paiement en ligne",
];

const STATUS_OPTIONS = ["payé", "en attente"];

const AccountingDashboard = () => {
  const [activeSection, setActiveSection] = useState("payments");
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [taxPayments, setTaxPayments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newPayment, setNewPayment] = useState({ clientName: "", totalAmount: "", paymentMethod: "" });
  const [newTax, setNewTax] = useState({ type: "", amount: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState(null);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const paymentsResponse = await axios.get('http://localhost:5000/api/payments', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      setPayments(paymentsResponse.data);

      const taxesResponse = await axios.get('http://localhost:5000/api/tax_payments');
      setTaxPayments(taxesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const addPayment = async () => {
    if (newPayment.clientName && newPayment.totalAmount && newPayment.paymentMethod) {
      try {
        const response = await axios.post('http://localhost:5000/api/payments', {
          clientName: newPayment.clientName,
          totalAmount: parseFloat(newPayment.totalAmount),
          paymentMethod: newPayment.paymentMethod,
          paymentDate: new Date().toISOString().split('T')[0]
        }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
        });
        setPayments([...payments, response.data]);
        setNewPayment({ clientName: "", totalAmount: "", paymentMethod: "" });
        displaySuccessMessage("Paiement ajouté avec succès !");
      } catch (error) {
        console.error('Error adding payment:', error);
        alert('Erreur lors de l’ajout du paiement: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addTax = async () => {
    if (newTax.type && newTax.amount) {
      try {
        const response = await axios.post('http://localhost:5000/api/tax_payments', {
          type: newTax.type,
          amount: parseFloat(newTax.amount),
          date: new Date().toISOString().split('T')[0],
          status: 'en attente'
        });
        setTaxPayments([...taxPayments, response.data]);
        setNewTax({ type: "", amount: "" });
        displaySuccessMessage("Taxe ajoutée avec succès !");
      } catch (error) {
        console.error('Error adding tax:', error);
        alert('Erreur lors de l’ajout de la taxe: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/payments/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      setPayments(payments.filter(payment => payment.id !== id));
      displaySuccessMessage("Paiement supprimé avec succès !");
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Erreur lors de la suppression du paiement');
    }
  };

  const deleteTax = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tax_payments/${id}`);
      setTaxPayments(taxPayments.filter(tax => tax.id !== id));
      displaySuccessMessage("Taxe supprimée avec succès !");
    } catch (error) {
      console.error('Error deleting tax:', error);
      alert('Erreur lors de la suppression de la taxe');
    }
  };

  const updateTaxStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tax_payments/${id}`, { status: newStatus });
      setTaxPayments(taxPayments.map(tax => 
        tax.id === id ? { ...tax, status: newStatus } : tax
      ));
      displaySuccessMessage("Statut de la taxe mis à jour avec succès !");
    } catch (error) {
      console.error('Error updating tax status:', error);
      alert('Erreur lors de la mise à jour du statut de la taxe');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleExport = (items, fileName) => {
    const csvContent = "data:text/csv;charset=utf-8," + items.map(item => Object.values(item).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const handleLogout = () => {
    alert("Déconnexion réussie");
    navigate("/employee");
  };

  const filteredPayments = payments.filter(payment =>
    (payment.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (payment.paymentMethod || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTaxes = taxPayments.filter(tax =>
    (tax.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tax.status || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="comptableService">
      <Sidebar
        buttons={[
          { name: "Payments", icon: <FaMoneyCheckAlt /> },
          { name: "Taxes", icon: <FaReceipt /> },
          { name: "Messages", icon: <FaEnvelope /> },
        ]}
        onButtonClick={(buttonName) => setActiveSection(buttonName.toLowerCase().replace(/ /g, "_"))}
        activeButton={activeSection}
        onLogout={handleLogout}
        dashboardName="ServiSync"
        profileImage={profilecomptable}
      />

      <div className="main-content">
        {successMessage && <p className="successMessage">{successMessage}</p>}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        {activeSection === "payments" && (
          <PaymentSection
            payments={paginate(filteredPayments)}
            newPayment={newPayment}
            setNewPayment={setNewPayment}
            addPayment={addPayment}
            deletePayment={deletePayment}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredPayments.length / itemsPerPage)}
          />
        )}

        {activeSection === "taxes" && (
          <TaxSection
            taxes={paginate(filteredTaxes)}
            newTax={newTax}
            setNewTax={setNewTax}
            addTax={addTax}
            deleteTax={deleteTax}
            updateTaxStatus={updateTaxStatus}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredTaxes.length / itemsPerPage)}
            handleExport={() => handleExport(taxPayments, "taxes")}
          />
        )}

        {activeSection === "messages" && (
          <MessageSection
            messages={messages}
            setMessages={setMessages}
            userRole="Accountant"
          />
        )}
      </div>
    </div>
  );
};

const PaymentSection = ({
  payments,
  newPayment,
  setNewPayment,
  addPayment,
  deletePayment,
  currentPage,
  setCurrentPage,
  totalPages,
}) => (
  <section className="section">
    <h2 className="heading">Paiements</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Nom du client</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Mode de paiement</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.clientName}</td>
            <td>{payment.totalAmount} €</td>
            <td>{payment.paymentDate}</td>
            <td>{payment.paymentMethod}</td>
            <td>
              <button className="button danger" onClick={() => deletePayment(payment.id)}>
                <FaTrash /> Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
    </div>
    <div className="form">
      <input
        type="text"
        placeholder="Nom du client"
        value={newPayment.clientName}
        onChange={(e) => setNewPayment({ ...newPayment, clientName: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Montant"
        value={newPayment.totalAmount}
        onChange={(e) => setNewPayment({ ...newPayment, totalAmount: e.target.value })}
        className="input"
      />
      <select
        value={newPayment.paymentMethod}
        onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
        className="input"
      >
        <option value="">Choisir un mode de paiement</option>
        {PAYMENT_METHODS.map((method, index) => (
          <option key={index} value={method}>
            {method}
          </option>
        ))}
      </select>
      <button className="button" onClick={addPayment}>
        <FaPlus /> Ajouter un paiement
      </button>
    </div>
  </section>
);

const TaxSection = ({
  taxes,
  newTax,
  setNewTax,
  addTax,
  deleteTax,
  updateTaxStatus,
  currentPage,
  setCurrentPage,
  totalPages,
  handleExport,
}) => (
  <section className="section">
    <h2 className="heading">Taxes</h2>
    <button className="button export" onClick={handleExport}>
      <FaFileExport /> Exporter en CSV
    </button>
    <table className="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {taxes.map((tax) => (
          <tr key={tax.id}>
            <td>{tax.type}</td>
            <td>{tax.amount} €</td>
            <td>{tax.date}</td>
            <td>
              <select
                value={tax.status}
                onChange={(e) => updateTaxStatus(tax.id, e.target.value)}
                className="input"
              >
                {STATUS_OPTIONS.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button className="button danger" onClick={() => deleteTax(tax.id)}>
                <FaTrash /> Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
    </div>
    <div className="form">
      <input
        type="text"
        placeholder="Type de taxe"
        value={newTax.type}
        onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Montant"
        value={newTax.amount}
        onChange={(e) => setNewTax({ ...newTax, amount: e.target.value })}
        className="input"
      />
      <button className="button" onClick={addTax}>
        <FaPlus /> Ajouter une taxe
      </button>
    </div>
  </section>
);

const MessageSection = ({ messages, setMessages, userRole }) => {
  const [selectedContact, setSelectedContact] = useState("Admin");
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState("");
  const chatEndRef = useRef(null);

  const contacts = [
    { name: "Admin", displayName: "Lucas Bernard", avatar: admin },
    { name: "Receptionist", displayName: "Paul Hugo", avatar: profilereceptioniste },
    { name: "Housekeeper", displayName: "Nadia Slimani", avatar: profilefemmenage },
  ];

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/user/Accountant`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      const filteredMessages = response.data.filter(
        (msg) =>
          (msg.sender === "Accountant" && msg.recipient === selectedContact) ||
          (msg.sender === selectedContact && msg.recipient === "Accountant")
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
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const addMessage = async () => {
    if (!newMessage.trim()) {
      setError('Veuillez entrer un message.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/messages', {
        sender: userRole,
        recipient: selectedContact,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
      setError(null);
      displaySuccessMessage("Message envoyé avec succès !");
    } catch (error) {
      console.error('Error adding message:', error);
      setError('Erreur lors de l’envoi du message.');
    }
  };

  const handleEditMessage = async (messageId) => {
    if (!editContent.trim()) {
      setError('Le message modifié ne peut pas être vide.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/messages/${messageId}`, {
        content: editContent
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      setEditingMessage(null);
      setEditContent("");
      displaySuccessMessage("Message modifié avec succès !");
      fetchMessages();
    } catch (error) {
      console.error('Error editing message:', error);
      setError('Erreur lors de la modification du message.');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message ?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/messages/${messageId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      displaySuccessMessage("Message supprimé avec succès !");
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
    setEditContent("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  return (
    <section className="section chat-section">
      <h2 className="heading">Messages</h2>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="chat-container">
        <div className="contact-list">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className={`contact ${selectedContact === contact.name ? "active" : ""}`}
              onClick={() => setSelectedContact(contact.name)}
            >
              <img
                src={contact.avatar}
                alt={contact.displayName}
                className="contact-avatar"
              />
              <div className="contact-info">
                <div className="contact-name">{contact.displayName}</div>
                <div className="contact-status">En ligne</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <img
              src={contacts.find(c => c.name === selectedContact)?.avatar}
              alt={selectedContact}
              className="chat-avatar"
            />
            <div className="chat-info">
              <div className="chat-name">{contacts.find(c => c.name === selectedContact)?.displayName}</div>
              <div className="contact-status">En ligne</div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.sender === userRole ? "message-outgoing" : "message-incoming"
                }`}
              >
                <div className="message-bubble">
                  <p>{msg.content}</p>
                  <div className="message-timestamp">
                    {msg.timestamp}
                  </div>
                  {msg.sender === userRole && (
                    <div className="message-actions">
                      <button
                        className="action-button edit-button"
                        onClick={() => openEditModal(msg)}
                      >
                        <FaEdit /> Modifier
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        <FaTrash /> Supprimer
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
              placeholder="Écrivez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input message-input"
              rows="1"
            />
            <button className="button send-button" onClick={addMessage}>
              <FaPaperPlane /> Envoyer
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
    </section>
  );
};

export default AccountingDashboard;