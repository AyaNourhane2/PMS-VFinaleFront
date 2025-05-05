import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaReceipt,
  FaPlus,
  FaTrash,
  FaFileExport,
  FaSearch,
  FaEnvelope,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import profilecomptable from "../assets/profilecompatible.webp";
import "../Style/accounting.css";

// Constantes pour les options de sélection
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

  // États pour les données
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [taxPayments, setTaxPayments] = useState([]);
  const [messages, setMessages] = useState([]);

  // États pour les nouveaux éléments
  const [newPayment, setNewPayment] = useState({ clientName: "", totalAmount: "", paymentMethod: "" });
  const [newInvoice, setNewInvoice] = useState({ clientName: "", amount: "" });
  const [newTax, setNewTax] = useState({ type: "", amount: "" });
  const [newMessage, setNewMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
        });
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    const fetchTaxes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tax_payments');
        setTaxPayments(response.data);
      } catch (error) {
        console.error('Error fetching taxes:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchPayments();
    fetchInvoices();
    fetchTaxes();
    fetchMessages();
  }, []);

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
      } catch (error) {
        console.error('Error adding payment:', error);
        alert('Error adding payment: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addInvoice = async () => {
    if (newInvoice.clientName && newInvoice.amount) {
      try {
        const response = await axios.post('http://localhost:5000/api/invoices', {
          clientName: newInvoice.clientName,
          amount: parseFloat(newInvoice.amount),
          status: 'en attente',
          date: new Date().toISOString().split('T')[0]
        });
        setInvoices([...invoices, response.data]);
        setNewInvoice({ clientName: "", amount: "" });
      } catch (error) {
        console.error('Error adding invoice:', error);
        alert('Error adding invoice: ' + (error.response?.data?.message || error.message));
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
      } catch (error) {
        console.error('Error adding tax:', error);
        alert('Error adding tax: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/messages', {
          sender: "User",
          recipient: "Receptionist",
          content: newMessage,
          timestamp: new Date().toISOString().slice(0, 16).replace("T", " ")
        });
        setMessages([...messages, response.data]);
        setNewMessage("");
      } catch (error) {
        console.error('Error adding message:', error);
        alert('Error adding message: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert("Veuillez entrer un message.");
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/payments/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Error deleting payment');
    }
  };

  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Error deleting invoice');
    }
  };

  const deleteTax = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tax_payments/${id}`);
      setTaxPayments(taxPayments.filter(tax => tax.id !== id));
    } catch (error) {
      console.error('Error deleting tax:', error);
      alert('Error deleting tax');
    }
  };

  const updateInvoiceStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/invoices/${id}`, { status: newStatus });
      setInvoices(invoices.map(invoice => 
        invoice.id === id ? { ...invoice, status: newStatus } : invoice
      ));
    } catch (error) {
      console.error('Error updating invoice status:', error);
      alert('Error updating invoice status');
    }
  };

  const updateTaxStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tax_payments/${id}`, { status: newStatus });
      setTaxPayments(taxPayments.map(tax => 
        tax.id === id ? { ...tax, status: newStatus } : tax
      ));
    } catch (error) {
      console.error('Error updating tax status:', error);
      alert('Error updating tax status');
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

  const filteredInvoices = invoices.filter(invoice =>
    (invoice.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (invoice.status || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTaxes = taxPayments.filter(tax =>
    (tax.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tax.status || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages.filter(message =>
    (message.sender || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="comptableService">
      <Sidebar
        buttons={[
          { name: "Payments", icon: <FaMoneyCheckAlt /> },
          { name: "Invoices", icon: <FaFileInvoiceDollar /> },
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

        {activeSection === "invoices" && (
          <InvoiceSection
            invoices={paginate(filteredInvoices)}
            newInvoice={newInvoice}
            setNewInvoice={setNewInvoice}
            addInvoice={addInvoice}
            deleteInvoice={deleteInvoice}
            updateInvoiceStatus={updateInvoiceStatus}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredInvoices.length / itemsPerPage)}
            handleExport={() => handleExport(invoices, "invoices")}
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
            messages={filteredMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            addMessage={addMessage}
          />
        )}
      </div>
    </div>
  );
};

// Composant pour la section des paiements
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

// Composant pour la section des factures
const InvoiceSection = ({
  invoices,
  newInvoice,
  setNewInvoice,
  addInvoice,
  deleteInvoice,
  updateInvoiceStatus,
  currentPage,
  setCurrentPage,
  totalPages,
  handleExport,
}) => (
  <section className="section">
    <h2 className="heading">Factures</h2>
    <button className="button export" onClick={handleExport}>
      <FaFileExport /> Exporter en CSV
    </button>
    <table className="table">
      <thead>
        <tr>
          <th>Nom du client</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.clientName}</td>
            <td>{invoice.amount} €</td>
            <td>{invoice.date}</td>
            <td>
              <select
                value={invoice.status}
                onChange={(e) => updateInvoiceStatus(invoice.id, e.target.value)}
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
              <button className="button danger" onClick={() => deleteInvoice(invoice.id)}>
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
        value={newInvoice.clientName}
        onChange={(e) => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Montant"
        value={newInvoice.amount}
        onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
        className="input"
      />
      <button className="button" onClick={addInvoice}>
        <FaPlus /> Ajouter une facture
      </button>
    </div>
  </section>
);

// Composant pour la section des taxes
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

// Composant pour la section des messages
const MessageSection = ({
  messages,
  newMessage,
  setNewMessage,
  addMessage,
}) => {
  const [selectedContact, setSelectedContact] = useState("Receptionist");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  return (
    <section className="section chat-section">
      <h2 className="heading">Messages</h2>
      <div className="chat-container">
        <div className="contact-list">
          <div
            className={`contact ${selectedContact === "Receptionist" ? "active" : ""}`}
            onClick={() => setSelectedContact("Receptionist")}
          >
            <img
              src={profilecomptable}
              alt="Receptionist"
              className="contact-avatar"
            />
            <div className="contact-info">
              <div className="contact-name">Receptionist</div>
              <div className="contact-status">Active Now</div>
            </div>
          </div>
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <img
              src={profilecomptable}
              alt="Receptionist"
              className="chat-avatar"
            />
            <div className="chat-info">
              <div className="chat-name">Receptionist</div>
              <div className="chat-status">Active Now</div>
            </div>
          </div>
          <div className="chat-messages">
            {messages
              .filter(
                (msg) =>
                  (msg.sender === "User" && msg.recipient === selectedContact) ||
                  (msg.sender === selectedContact && msg.recipient === "User")
              )
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "User" ? "message-outgoing" : "message-incoming"
                  }`}
                >
                  <div className="message-bubble">
                    {msg.content}
                    <div className="message-timestamp">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input">
            <textarea
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input message-input"
              rows="1"
            />
            <button className="button send-button" onClick={addMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountingDashboard;