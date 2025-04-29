import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaTasks, FaClipboardList, FaShoppingCart, FaUserCheck, FaCheck, FaPlus } from "react-icons/fa";
import profilefemmenage from "../assets/profilefemmemenage.webp";
import "../Style/housekeeping.css";

const HousekeepingDashboard = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Tâches de Ménage");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, room: "101", status: "à nettoyer" },
    { id: 2, room: "102", status: "en maintenance" },
    { id: 3, room: "103", status: "utilisé" },
  ]);
  const [specialRequests, setSpecialRequests] = useState([
    { id: 1, room: "101", request: "Nettoyage urgent", status: "en attente" },
  ]);
  const [inventoryOrders, setInventoryOrders] = useState([]);
  const [staff, setStaff] = useState([
    { id: 1, name: "Jean Dupont", status: "présent", performance: 8 },
    { id: 2, name: "Marie Curie", status: "absent", performance: 7 },
  ]);
  const [newTask, setNewTask] = useState({ room: "", status: "" });
  const [newRequest, setNewRequest] = useState({ room: "", request: "" });
  const [newOrder, setNewOrder] = useState({ product: "", quantity: "" });
  const [newEmployee, setNewEmployee] = useState({ name: "", status: "", performance: "" });

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const addTask = () => {
    if (newTask.room && newTask.status) {
      const newTaskEntry = {
        id: tasks.length + 1,
        room: newTask.room,
        status: newTask.status,
      };
      setTasks([...tasks, newTaskEntry]);
      setNewTask({ room: "", status: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addSpecialRequest = () => {
    if (newRequest.room && newRequest.request) {
      const newRequestEntry = {
        id: specialRequests.length + 1,
        room: newRequest.room,
        request: newRequest.request,
        status: "en attente",
      };
      setSpecialRequests([...specialRequests, newRequestEntry]);
      setNewRequest({ room: "", request: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addInventoryOrder = () => {
    if (newOrder.product && newOrder.quantity) {
      const newOrderEntry = {
        id: inventoryOrders.length + 1,
        product: newOrder.product,
        quantity: newOrder.quantity,
        date: new Date().toISOString().split('T')[0],
      };
      setInventoryOrders([...inventoryOrders, newOrderEntry]);
      setNewOrder({ product: "", quantity: "" });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.status && newEmployee.performance) {
      const newEmployeeEntry = {
        id: staff.length + 1,
        name: newEmployee.name,
        status: newEmployee.status,
        performance: parseFloat(newEmployee.performance),
      };
      setStaff([...staff, newEmployeeEntry]);
      setNewEmployee({ name: "", status: "", performance: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const buttons = [
    { name: "Tâches de Ménage", icon: <FaTasks /> },
    { name: "Demandes Spéciales", icon: <FaClipboardList /> },
    { name: "Commande des Produits", icon: <FaShoppingCart /> },
    { name: "Suivi du Personnel", icon: <FaUserCheck /> },
  ];

  const handleLogout = () => {
    alert("Déconnexion réussie !");
    navigate("/employee"); // Rediriger vers la page d'accueil
  };

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
                    <td>{task.status}</td>
                    <td>
                      <button className="button" onClick={() => updateTaskStatus(task.id, "propre")}>
                        <FaCheck /> Marquer comme propre
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="ID de la chambre"
                value={newTask.room}
                onChange={(e) => setNewTask({ ...newTask, room: e.target.value })}
                className="input"
              />
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="input"
              >
                <option value="">Choisir un statut</option>
                <option value="à nettoyer">À nettoyer</option>
                <option value="en maintenance">En maintenance</option>
                <option value="utilisé">Utilisé</option>
              </select>
              <button className="button" onClick={addTask}>
                <FaPlus /> Ajouter une tâche
              </button>
            </div>
          </section>
        )}

        {activeButton === "Demandes Spéciales" && (
          <section className="section">
            <h2 className="heading">Demandes Spéciales</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID de la chambre</th>
                  <th>Demande</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {specialRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.room}</td>
                    <td>{request.request}</td>
                    <td>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="ID de la chambre"
                value={newRequest.room}
                onChange={(e) => setNewRequest({ ...newRequest, room: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Demande"
                value={newRequest.request}
                onChange={(e) => setNewRequest({ ...newRequest, request: e.target.value })}
                className="input"
              />
              <button className="button" onClick={addSpecialRequest}>
                <FaPlus /> Ajouter une demande
              </button>
            </div>
          </section>
        )}

        {activeButton === "Commande des Produits" && (
          <section className="section">
            <h2 className="heading">Commande des Produits</h2>
            {showSuccessMessage && <p className="successMessage">Commande envoyée avec succès !</p>}
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
                    <td>{order.date}</td>
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
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Statut</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.status}</td>
                    <td>{employee.performance}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Nom de l'employé"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="input"
              />
              <select
                value={newEmployee.status}
                onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
                className="input"
              >
                <option value="">Choisir un statut</option>
                <option value="présent">Présent</option>
                <option value="absent">Absent</option>
              </select>
              <input
                type="number"
                placeholder="Performance/10"
                value={newEmployee.performance}
                onChange={(e) => setNewEmployee({ ...newEmployee, performance: e.target.value })}
                className="input"
              />
              <button className="button" onClick={addEmployee}>
                <FaPlus /> Ajouter un employé
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HousekeepingDashboard;