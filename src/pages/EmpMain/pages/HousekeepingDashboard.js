import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaTasks, FaShoppingCart, FaUserCheck, FaCheck, FaPlus, FaEnvelope, FaSearch, FaPaperPlane, FaEdit, FaTrash } from "react-icons/fa";
import profilefemmenage from "../assets/personnel de menage.webp";
import profilereceptioniste from "../assets/profilereceptioniste.webp";
import admin from "../assets/admin.jpg";
import "../Style/housekeeping.css";

const HousekeepingDashboard = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Tâches de Ménage");
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [inventoryOrders, setInventoryOrders] = useState([]);
  const [staff, setStaff] = useState([]);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newTask, setNewTask] = useState({ room: "", status: "" });
  const [newOrder, setNewOrder] = useState({ product: "", quantity: "" });
  const [newEmployee, setNewEmployee] = useState({
    nom: "",
    position: "",
    performance: "",
  });
  const [newMessage, setNewMessage] = useState("");
  const [staffSearchQuery, setStaffSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const roomsResponse = await axios.get("http://localhost:5000/api/rooms");
      setRooms(roomsResponse.data);

      const tasksResponse = await axios.get("http://localhost:5000/api/housekeeping_tasks");
      setTasks(tasksResponse.data);

      const ordersResponse = await axios.get("http://localhost:5000/api/inventory_orders");
      setInventoryOrders(ordersResponse.data);

      const staffResponse = await axios.get("http://localhost:5000/api/staff");
      setStaff(staffResponse.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const displaySuccessMessage = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(null), 3000);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/housekeeping_tasks/${taskId}`,
        { status: newStatus }
      );
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
      displaySuccessMessage("Statut de la tâche mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la tâche:", error);
      alert("Impossible de mettre à jour le statut de la tâche.");
    }
  };

  const addTask = async () => {
    if (newTask.room && newTask.status) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/housekeeping_tasks",
          { room: newTask.room, status: newTask.status }
        );
        setTasks([...tasks, response.data]);
        setNewTask({ room: "", status: "" });
        displaySuccessMessage("Tâche ajoutée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche:", error);
        alert("Impossible d'ajouter la tâche. Vérifiez que la chambre existe.");
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addInventoryOrder = async () => {
    if (newOrder.product && newOrder.quantity) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inventory_orders",
          { product: newOrder.product, quantity: newOrder.quantity }
        );
        setInventoryOrders([...inventoryOrders, response.data]);
        setNewOrder({ product: "", quantity: "" });
        displaySuccessMessage("Commande envoyée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout de la commande:", error);
        alert("Impossible d'ajouter la commande.");
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addEmployee = async () => {
    const { nom, position, performance } = newEmployee;
    if (nom && position && performance) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/staff",
          {
            nom,
            position,
            performance: parseFloat(performance),
          }
        );
        setStaff([...staff, response.data.data]);
        setNewEmployee({
          nom: "",
          position: "",
          performance: "",
        });
        displaySuccessMessage("Employé ajouté avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'employé:", error);
        alert(error.response?.data?.message || "Impossible d'ajouter l'employé.");
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const buttons = [
    { name: "Tâches de Ménage", icon: <FaTasks /> },
    { name: "Commande des Produits", icon: <FaShoppingCart /> },
    { name: "Suivi du Personnel", icon: <FaUserCheck /> },
    { name: "Messages", icon: <FaEnvelope /> },
  ];

  const handleLogout = () => {
    alert("Déconnexion réussie !");
    navigate("/employee");
  };

  const availableRooms = rooms.length > 0
    ? rooms.map((room) => room.room)
    : Array.from({ length: 9 }, (_, i) => (1001 + i).toString());

  const filteredStaff = staff.filter((employee) =>
    employee.nom.toLowerCase().includes(staffSearchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <Sidebar
        buttons={buttons}
        onButtonClick={setActiveButton}
        activeButton={activeButton}
        onLogout={handleLogout}
        dashboardName="Contrôle Propre"
        profileImage={profilefemmenage}
      />
      <div className="main-content">
        {showSuccessMessage && <p className="successMessage">{showSuccessMessage}</p>}
        {activeButton === "Tâches de Ménage" && (
          <section className="section">
            <h2 className="heading">Tâches de Ménage</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID de la chambre</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.room}</td>
                    <td>
                      {task.status === "clean" ? "Propre" :
                       task.status === "dirty" ? "Sale" :
                       task.status === "in_progress" ? "En cours" :
                       "Inspecté"}
                    </td>
                    <td>
                      <button className="button" onClick={() => updateTaskStatus(task.id, "clean")}>
                        <FaCheck /> Marquer comme propre
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <select
                value={newTask.room}
                onChange={(e) => setNewTask({ ...newTask, room: e.target.value })}
                className="input"
              >
                <option value="">Choisir une chambre</option>
                {availableRooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="input"
              >
                <option value="">Choisir un statut</option>
                <option value="clean">Propre</option>
                <option value="dirty">Sale</option>
                <option value="in_progress">En cours</option>
                <option value="inspected">Inspecté</option>
              </select>
              <button className="button" onClick={addTask}>
                <FaPlus /> Ajouter une tâche
              </button>
            </div>
          </section>
        )}

        {activeButton === "Commande des Produits" && (
          <section className="section">
            <h2 className="heading">Commande des Produits</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {inventoryOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{new Date(order.order_date).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Nom du produit"
                value={newOrder.product}
                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                className="input"
              />
              <input
                type="number"
                placeholder="Quantité"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                className="input"
                min="1"
              />
              <button className="button" onClick={addInventoryOrder}>
                <FaPlus /> Envoyer la commande
              </button>
            </div>
          </section>
        )}

        {activeButton === "Suivi du Personnel" && (
          <section className="section">
            <h2 className="heading">Suivi du Personnel</h2>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un employé par nom..."
                value={staffSearchQuery}
                onChange={(e) => setStaffSearchQuery(e.target.value)}
                className="input search-input"
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Poste</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.nom}</td>
                    <td>
                      {employee.position === "Housekeeper" ? "Femme de ménage" :
                       employee.position === "Supervisor" ? "Superviseur" :
                       employee.position === "Cleaner" ? "Nettoyeur" :
                       employee.position}
                    </td>
                    <td>
                      <div className="performance-bar">
                        <div 
                          className="performance-fill" 
                          style={{ width: `${employee.performance * 10}%` }}
                        ></div>
                        <span>{employee.performance}/10</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Nom"
                value={newEmployee.nom}
                onChange={(e) => setNewEmployee({ ...newEmployee, nom: e.target.value })}
                className="input"
              />
              <select
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                className="input"
              >
                <option value="">Choisir un poste</option>
                <option value="Housekeeper">Femme de ménage</option>
                <option value="Supervisor">Superviseur</option>
                <option value="Cleaner">Nettoyeur</option>
              </select>
              <input
                type="number"
                placeholder="Performance/10"
                value={newEmployee.performance}
                onChange={(e) => setNewEmployee({ ...newEmployee, performance: e.target.value })}
                className="input"
                min="0"
                max="10"
                step="0.1"
              />
              <button className="button" onClick={addEmployee}>
                <FaPlus /> Ajouter un employé
              </button>
            </div>
          </section>
        )}

        {activeButton === "Messages" && (
          <MessageSection
            messages={messages}
            setMessages={setMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            userRole="Housekeeper"
          />
        )}
      </div>
    </div>
  );
};

const MessageSection = ({ messages, setMessages, newMessage, setNewMessage, userRole }) => {
  const [selectedContact, setSelectedContact] = useState("Receptionist");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState("");
  const chatEndRef = useRef(null);

  const contacts = [
    { name: "Receptionist", displayName: "Paul Hugo", avatar: profilereceptioniste },
    { name: "Admin", displayName: "Lucas Bernard", avatar: admin },
  ];

  const allowedCommunications = {
    Housekeeper: ["Receptionist", "Admin"],
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/user/Housekeeper`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      });
      const filteredMessages = response.data.filter(
        msg =>
          (msg.sender === "Housekeeper" && allowedCommunications["Housekeeper"].includes(msg.recipient)) ||
          (msg.recipient === "Housekeeper" && allowedCommunications["Housekeeper"].includes(msg.sender))
      );
      setMessages(filteredMessages.map(msg => ({
        id: msg.id,
        sender: msg.senderName || msg.sender,
        recipient: msg.recipientName || msg.recipient,
        content: msg.content,
        timestamp: msg.timestamp
      })));
      setError(null);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Impossible de charger les messages. Veuillez réessayer.");
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
      setError("Veuillez entrer un message.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/messages",
        {
          sender: userRole,
          recipient: selectedContact,
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          senderName: "Nadia Slimani",
          recipientName: contacts.find(c => c.name === selectedContact)?.displayName
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        }
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
      setError(null);
      displaySuccessMessage("Message envoyé avec succès !");
    } catch (error) {
      console.error("Error adding message:", error);
      setError("Erreur lors de l’envoi du message.");
    }
  };

  const handleEditMessage = async (messageId) => {
    if (!editContent.trim()) {
      setError("Le message modifié ne peut pas être vide.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/messages/${messageId}`,
        { content: editContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        }
      );
      setEditingMessage(null);
      setEditContent("");
      displaySuccessMessage("Message modifié avec succès !");
      fetchMessages();
    } catch (error) {
      console.error("Error editing message:", error);
      setError("Erreur lors de la modification du message.");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      });
      displaySuccessMessage("Message supprimé avec succès !");
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Erreur lors de la suppression du message.");
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
    <div className="chat-section">
      {error && <p className="message error">{error}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
      <div className="chat-container">
        <div className="contact-list">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className={`contact ${selectedContact === contact.name ? "active" : ""}`}
              onClick={() => setSelectedContact(contact.name)}
            >
              <img src={contact.avatar} alt={contact.displayName} className="contact-avatar" />
              <div className="contact-info">
                <div className="contact-name">{contact.displayName}</div>
                <div className="contact-status">En ligne</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <div className="chat-info">
              <div className="chat-name">{contacts.find((c) => c.name === selectedContact)?.displayName}</div>
              <div className="chat-status">En ligne</div>
            </div>
          </div>
          <div className="chat-messages">
            {messages
              .filter(
                (msg) =>
                  (msg.sender === "Housekeeper" && msg.recipient === selectedContact) ||
                  (msg.sender === selectedContact && msg.recipient === "Housekeeper")
              )
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "Housekeeper" ? "message-outgoing" : "message-incoming"
                  }`}
                >
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                    <div className="message-timestamp">{msg.timestamp}</div>
                    {msg.sender === "Housekeeper" && (
                      <div className="message-actions">
                        <button className="action-button" onClick={() => openEditModal(msg)}>
                          <FaEdit />
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleDeleteMessage(msg.id)}
                        >
                          <FaTrash />
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
            <button className="send-button" onClick={addMessage}>
              <FaPaperPlane /> Envoyer
            </button>
          </div>
        </div>
      </div>
      {editingMessage && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modifier le message</h3>
            <textarea
              className="message-input"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Modifier votre message..."
              rows="4"
            />
            <div className="modal-actions">
              <button className="btn" onClick={() => handleEditMessage(editingMessage)}>
                Enregistrer
              </button>
              <button className="btn secondary" onClick={closeEditModal}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HousekeepingDashboard;