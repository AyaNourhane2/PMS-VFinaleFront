/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { 
  FaCheckCircle, 
  FaPlus, 
  FaSignOutAlt, 
  FaBed, 
  FaUsers, 
  FaUserCheck,
  FaClipboardList,
  FaHome,
  FaChartBar,
  FaCoins, 
  FaComments,
} from "react-icons/fa";
import profilereceptioniste from "../assets/profilereceptioniste.webp";
import admin from "../assets/admin.jpg";
import menage from "../assets/menage.jpg";
import compatible from "../assets/compatible.jpg";
import room1001 from "../assets/room1001.png";
import room1002 from "../assets/room1002.png";
import room1003 from "../assets/room1003.png";
import room1004 from "../assets/room1004.png";
import room1005 from "../assets/room1005.png";
import room1006 from "../assets/room1006.png";
import room1007 from "../assets/room1007.png";
import room1008 from "../assets/room1008.png";
import room1009 from "../assets/room1009.png";

import "../components/sidebar.css";
import "../Style/receptioniste.css";

// Composant HomeDashboard
const HomeDashboard = () => {
  const [notifications] = useState([
    { id: 1, message: "Nouvelle réservation pour John Doe", type: "info" },
    { id: 2, message: "Chambre 101 nécessite un nettoyage urgent", type: "urgent" },
    { id: 3, message: "2 arrivées prévues aujourd'hui", type: "info" },
  ]);

  const [upcomingReservations] = useState([
    { id: 1, guestName: "Jane Smith", room: "102", checkInDate: "2023-10-25" },
    { id: 2, guestName: "Michael Brown", room: "103", checkInDate: "2023-10-26" },
  ]);

  const navigate = useNavigate();

  const handleCheckArrivals = () => {
    navigate("/receptionist/welcome");
  };

  const handleCheckDepartures = () => {
    navigate("/receptionist/departure");
  };

  const handleViewAvailableRooms = () => {
    navigate("/receptionist/room-management", { state: { filter: "Disponible" } });
  };

  return (
    <div className="container home-dashboard">
      <h2>Tableau de Bord Principal</h2>
      
      <div className="dashboard-grid">
        <div className="notifications">
          <h3>Notifications</h3>
          <ul>
            {notifications.map(notification => (
              <li key={notification.id} className={notification.type}>
                {notification.message}
              </li>
            ))}
          </ul>
        </div>

        <div className="upcoming-reservations">
          <h3>Arrivées à venir</h3>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Chambre</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {upcomingReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>{reservation.guestName}</td>
                  <td>{reservation.room}</td>
                  <td>{reservation.checkInDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="quick-actions">
          <h3>Actions Rapides</h3>
          <button onClick={handleCheckArrivals}>Enregistrer une arrivée</button>
          <button onClick={handleCheckDepartures}>Gérer un départ</button>
          <button onClick={handleViewAvailableRooms}>Voir chambres disponibles</button>
        </div>
      </div>
    </div>
  );
};

// Composant GuestWelcome
const GuestWelcome = () => {
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    reservationNumber: "",
    idNumber: "",
    address: "",
    roomPreference: "",
    specialRequests: ""
  });

  const [roomAssignment, setRoomAssignment] = useState({
    roomNumber: "",
    floor: "",
    roomType: ""
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo({ ...guestInfo, [name]: value });
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomAssignment({ ...roomAssignment, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Client ${guestInfo.name} enregistré dans la chambre ${roomAssignment.roomNumber}!`);
  };

  return (
    <div className="container guest-welcome">
      <h2>Enregistrement d'Arrivée</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h3>Étape 1: Informations client</h3>
            <div className="form-group">
              <label>Nom complet</label>
              <input
                type="text"
                name="name"
                value={guestInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Numéro de réservation</label>
              <input
                type="text"
                name="reservationNumber"
                value={guestInfo.reservationNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Numéro de pièce d'identité</label>
              <input
                type="text"
                name="idNumber"
                value={guestInfo.idNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn" onClick={nextStep}>Suivant</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Étape 2: Attribution de chambre</h3>
            <div className="form-group">
              <label>Numéro de chambre</label>
              <input
                type="text"
                name="roomNumber"
                value={roomAssignment.roomNumber}
                onChange={handleRoomChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Étage</label>
              <input
                type="text"
                name="floor"
                value={roomAssignment.floor}
                onChange={handleRoomChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Type de chambre</label>
              <select
                name="roomType"
                value={roomAssignment.roomType}
                onChange={handleRoomChange}
                required
              >
                <option value="">Sélectionner</option>
                <option value="Standard">Standard</option>
                <option value="Supérieure">Supérieure</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="button" className="btn" onClick={nextStep}>Suivant</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Étape 3: Confirmation</h3>
            <div className="confirmation-details">
              <h4>Récapitulatif</h4>
              <p><strong>Client:</strong> {guestInfo.name}</p>
              <p><strong>Pièce d'identité:</strong> {guestInfo.idNumber}</p>
              <p><strong>Chambre:</strong> {roomAssignment.roomNumber} (Étage {roomAssignment.floor})</p>
              <p><strong>Type:</strong> {roomAssignment.roomType}</p>
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="submit" className="btn">Confirmer l'arrivée</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// Composant ReservationRequests
const ReservationRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      guestName: "Jean Dupont",
      checkInDate: "2023-11-15",
      checkOutDate: "2023-11-20",
      roomType: "Chambre Standard",
      guests: 2,
      specialRequests: "Lit bébé nécessaire",
      status: "En attente",
      submittedAt: "2023-11-01 14:30"
    },
    {
      id: 2,
      guestName: "Marie Martin",
      checkInDate: "2023-11-18",
      checkOutDate: "2023-11-22",
      roomType: "Suite Deluxe",
      guests: 4,
      specialRequests: "Anniversaire de mariage",
      status: "En attente",
      submittedAt: "2023-11-02 09:15"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const filteredRequests = requests.filter(request => {
    if (filter === "all") return true;
    return request.status === filter;
  });

  const handleApprove = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: "Approuvée" } : request
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: "Rejetée" } : request
    ));
  };

  return (
    <div className="container reservation-requests">
      <h2>Demandes de Réservation</h2>
      
      <div className="filter-controls">
        <label>Filtrer par statut :</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Toutes</option>
          <option value="En attente">En attente</option>
          <option value="Approuvée">Approuvées</option>
          <option value="Rejetée">Rejetées</option>
        </select>
      </div>

      <div className="requests-list">
        {filteredRequests.map(request => (
          <div key={request.id} className={`request-card ${request.status.toLowerCase()}`}>
            <div className="request-header">
              <h3>Demande #{request.id}</h3>
              <span className={`status-badge ${request.status.toLowerCase()}`}>
                {request.status}
              </span>
            </div>
            
            <div className="request-details">
              <div className="detail-group">
                <label>Client :</label>
                <p>{request.guestName}</p>
              </div>
              
              <div className="detail-group">
                <label>Dates :</label>
                <p>Du {request.checkInDate} au {request.checkOutDate}</p>
              </div>
              
              <div className="detail-group">
                <label>Type de chambre :</label>
                <p>{request.roomType}</p>
              </div>
              
              {request.specialRequests && (
                <div className="detail-group">
                  <label>Demandes spéciales :</label>
                  <p>{request.specialRequests}</p>
                </div>
              )}
              
              <div className="detail-group">
                <label>Soumise le :</label>
                <p>{request.submittedAt}</p>
              </div>
            </div>
            
            {request.status === "En attente" && (
              <div className="request-actions">
                <button 
                  className="btn approve" 
                  onClick={() => handleApprove(request.id)}
                >
                  Accepter
                </button>
                <button 
                  className="btn reject" 
                  onClick={() => handleReject(request.id)}
                >
                  Refuser
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant AuthenticateReservation
const AuthenticateReservation = () => {
  const [reservationNumber, setReservationNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simuler une réponse de l'API
      const fakeResponse = {
        reservation: {
          guest_name: "John Doe",
          room_type: "Chambre Standard",
          check_in_date: "2023-10-15",
          check_out_date: "2023-10-20",
          status: "confirmée",
          payment_status: "payée"
        },
      };
      setReservation(fakeResponse.reservation);
      setError("");
    } catch (err) {
      setError("Réservation non trouvée ou informations incorrectes.");
      setReservation(null);
    }
  };

  return (
    <div className="container authenticate-reservation">
      <h2>Authentifier une Réservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numéro de réservation</label>
          <input
            type="text"
            placeholder="Numéro de réservation"
            value={reservationNumber}
            onChange={(e) => setReservationNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom du client</label>
          <input
            type="text"
            placeholder="Nom du client"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Vérifier</button>
      </form>
      {error && <p className="message error">{error}</p>}
      {reservation && (
        <div className="reservation-details">
          <h3>Détails de la Réservation</h3>
          <p><strong>Nom:</strong> {reservation.guest_name}</p>
          <p><strong>Chambre:</strong> {reservation.room_type}</p>
          <p><strong>Arrivée:</strong> {reservation.check_in_date}</p>
          <p><strong>Départ:</strong> {reservation.check_out_date}</p>
          <p><strong>Statut:</strong> {reservation.status}</p>
          <p><strong>Paiement:</strong> {reservation.payment_status}</p>
        </div>
      )}
    </div>
  );
};

// Composant CreateReservation
const CreateReservation = () => {
  const [reservation, setReservation] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    roomType: "Standard",
    adults: 1,
    children: 0,
    specialRequests: ""
  });

  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Réservation créée avec succès !");
    // Réinitialiser le formulaire
    setReservation({
      guestName: "",
      email: "",
      phone: "",
      checkInDate: "",
      checkOutDate: "",
      roomType: "Standard",
      adults: 1,
      children: 0,
      specialRequests: ""
    });
    setStep(1);
  };

  return (
    <div className="container create-reservation">
      <h2>Créer une Nouvelle Réservation</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h3>Étape 1: Informations client</h3>
            <div className="form-group">
              <label>Nom complet</label>
              <input
                type="text"
                name="guestName"
                value={reservation.guestName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={reservation.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={reservation.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn" onClick={nextStep}>Suivant</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Étape 2: Détails du séjour</h3>
            <div className="form-group">
              <label>Date d'arrivée</label>
              <input
                type="date"
                name="checkInDate"
                value={reservation.checkInDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date de départ</label>
              <input
                type="date"
                name="checkOutDate"
                value={reservation.checkOutDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Type de chambre</label>
              <select
                name="roomType"
                value={reservation.roomType}
                onChange={handleChange}
                required
              >
                <option value="Standard">Standard</option>
                <option value="Supérieure">Supérieure</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div className="form-group">
              <label>Adultes</label>
              <input
                type="number"
                name="adults"
                value={reservation.adults}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Enfants</label>
              <input
                type="number"
                name="children"
                value={reservation.children}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="button" className="btn" onClick={nextStep}>Suivant</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Étape 3: Options supplémentaires</h3>
            <div className="form-group">
              <label>Demandes spéciales</label>
              <textarea
                name="specialRequests"
                value={reservation.specialRequests}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="submit" className="btn">Créer la réservation</button>
            </div>
          </div>
        )}
      </form>
      {message && <p className="message success">{message}</p>}
    </div>
  );
};

// Composant GuestDeparture
const GuestDeparture = () => {
  const [reservationNumber, setReservationNumber] = useState("");
  const [guestInfo, setGuestInfo] = useState(null);
  const [additionalCharges, setAdditionalCharges] = useState([
    { id: 1, name: "Mini-bar", amount: 0, checked: false },
    { id: 2, name: "Room service", amount: 0, checked: false },
    { id: 3, name: "Blanchisserie", amount: 0, checked: false }
  ]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [invoiceRequested, setInvoiceRequested] = useState(false);

  const handleCheckChange = (id) => {
    setAdditionalCharges(additionalCharges.map(charge => 
      charge.id === id ? { ...charge, checked: !charge.checked } : charge
    ));
  };

  const handleAmountChange = (id, value) => {
    setAdditionalCharges(additionalCharges.map(charge => 
      charge.id === id ? { ...charge, amount: parseFloat(value) || 0 } : charge
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCharges = additionalCharges
      .filter(charge => charge.checked)
      .reduce((sum, charge) => sum + charge.amount, 0);
    
    const totalAmount = 200 + totalCharges; // Prix de base de la chambre
    
    alert(`Départ enregistré. 
      Total des frais: ${totalAmount}€ 
      Méthode de paiement: ${paymentMethod}
      ${invoiceRequested ? 'Facture demandée' : 'Pas de facture'}`);
  };

  return (
    <div className="container guest-departure">
      <h2>Gestion des Départs</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numéro de réservation</label>
          <input
            type="text"
            value={reservationNumber}
            onChange={(e) => setReservationNumber(e.target.value)}
            required
          />
        </div>
        
        {guestInfo && (
          <div className="guest-info">
            <h3>Informations client</h3>
            <p>Nom: {guestInfo.name}</p>
            <p>Chambre: {guestInfo.room}</p>
            <p>Date d'arrivée: {guestInfo.checkIn}</p>
            <p>Date de départ: {guestInfo.checkOut}</p>
          </div>
        )}

        <h3>Frais supplémentaires</h3>
        {additionalCharges.map(charge => (
          <div key={charge.id} className="charge-item">
            <label>
              <input
                type="checkbox"
                checked={charge.checked}
                onChange={() => handleCheckChange(charge.id)}
              />
              {charge.name}
            </label>
            {charge.checked && (
              <input
                type="number"
                value={charge.amount}
                onChange={(e) => handleAmountChange(charge.id, e.target.value)}
                min="0"
                step="0.01"
                placeholder="Montant"
              />
            )}
          </div>
        ))}

        <div className="form-group">
          <label>Méthode de paiement</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Sélectionner</option>
            <option value="Carte bancaire">Carte bancaire</option>
            <option value="Espèces">Espèces</option>
            <option value="Chèque">Chèque</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={invoiceRequested}
              onChange={() => setInvoiceRequested(!invoiceRequested)}
            />
            Facture demandée
          </label>
        </div>

        <div className="feedback-section">
          <h3>Commentaires du client</h3>
          <textarea placeholder="Notes sur le séjour..." rows="3"></textarea>
        </div>

        <button type="submit" className="btn">Finaliser le départ</button>
      </form>
    </div>
  );
};

// Composant RoomManagement
const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    { id: 1, number: "1001", status: "Disponible", type: "Standard", floor: "1", cleaningStatus: "Propre", price: 100 },
    { id: 2, number: "1002", status: "Occupée", type: "Supérieure", floor: "1", cleaningStatus: "A nettoyer", price: 150 },
    { id: 3, number: "1003", status: "Maintenance", type: "Deluxe", floor: "1", cleaningStatus: "En cours", price: 200 },
    { id: 4, number: "1004", status: "Disponible", type: "Suite", floor: "2", cleaningStatus: "Propre", price: 250 },
    { id: 5, number: "1005", status: "Réservée", type: "Deluxe", floor: "2", cleaningStatus: "Propre", price: 200 },
  ]);

  const [filter, setFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");

  const filteredRooms = rooms.filter((room) => {
    const statusMatch = filter === "all" || room.status === filter;
    const floorMatch = floorFilter === "all" || room.floor === floorFilter;
    return statusMatch && floorMatch;
  });

  const changeRoomStatus = (id, newStatus) => {
    setRooms(rooms.map(room => room.id === id ? { ...room, status: newStatus } : room));
  };

  return (
    <div className="container room-management">
      <h2>Gestion des Chambres</h2>

      <div className="filters">
        <div className="form-group">
          <label>Filtrer par statut:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tous</option>
            <option value="Disponible">Disponible</option>
            <option value="Occupée">Occupée</option>
            <option value="Réservée">Réservée</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Filtrer par étage:</label>
          <select value={floorFilter} onChange={(e) => setFloorFilter(e.target.value)}>
            <option value="all">Tous</option>
            <option value="1">1er étage</option>
            <option value="2">2ème étage</option>
          </select>
        </div>
      </div>

      <table className="room-table">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Étage</th>
            <th>Type</th>
            <th>Prix (€/nuit)</th>
            <th>Statut</th>
            <th>Nettoyage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room.id} className={`status-${room.status.toLowerCase()}`}>
              <td>{room.number}</td>
              <td>{room.floor}</td>
              <td>{room.type}</td>
              <td>{room.price} €</td>
              <td>{room.status}</td>
              <td>{room.cleaningStatus}</td>
              <td>
                <select
                  value={room.status}
                  onChange={(e) => changeRoomStatus(room.id, e.target.value)}
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Occupée">Occupée</option>
                  <option value="Réservée">Réservée</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Composant AdministrativeTasks
const AdministrativeTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Vérifier les réservations en ligne", done: false, category: "Réservations", priority: "moyenne" },
    { id: 2, name: "Mettre à jour le PMS", done: false, category: "Système", priority: "haute" },
    { id: 3, name: "Préparer les rapports quotidiens", done: false, category: "Rapports", priority: "basse" },
    { id: 4, name: "Coordonner avec le service de ménage", done: false, category: "Ménage", priority: "moyenne" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        name: newTask,
        done: false,
        category: "Divers",
        priority: "moyenne",
      }]);
      setNewTask("");
    }
  };

  const filteredTasks = tasks.filter(task => {
    const categoryMatch = categoryFilter === "all" || task.category === categoryFilter;
    const priorityMatch = priorityFilter === "all" || task.priority === priorityFilter;
    return categoryMatch && priorityMatch;
  });

  return (
    <div className="container administrative-tasks">
      <h2>Liste des Tâches à Faire</h2>

      <div className="task-controls">
        <div className="form-group">
          <label>Filtrer par catégorie:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">Toutes</option>
            <option value="Réservations">Réservations</option>
            <option value="Système">Système</option>
            <option value="Rapports">Rapports</option>
            <option value="Ménage">Ménage</option>
            <option value="Divers">Divers</option>
          </select>
        </div>

        <div className="form-group">
          <label>Filtrer par priorité:</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">Toutes</option>
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
        </div>

        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nouvelle tâche..."
          />
          <button onClick={addTask}>Ajouter</button>
        </div>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-name">{task.name}</span>
              <span className={`task-priority ${task.priority}`}>{task.priority}</span>
              <span className="task-category">{task.category}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Composant Conversation
const Conversation = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Admin",
      content: "Bonjour, comment puis-je vous aider aujourd'hui?",
      timestamp: "10:30",
      incoming: true
    },
    {
      id: 2,
      sender: "Receptionist",
      content: "J'ai besoin d'aide avec une réservation",
      timestamp: "10:32",
      incoming: false
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

      // Simuler une réponse après 1 seconde
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          sender: selectedContact,
          content: `Nous traitons votre demande.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          incoming: true
        };
        setMessages(prev => [...prev, reply]);
      }, 1000);
    }
  };

  return (
    <div className="container conversation">
      <h2>Conversation</h2>
      
      <div className="chat-container">
        <div className="contact-list">
          <div
            className={`contact ${selectedContact === "Admin" ? "active" : ""}`}
            onClick={() => setSelectedContact("Admin")}
          >
            <img src={admin} alt="Admin" className="contact-avatar" />
            <div className="contact-info">
              <div className="contact-name">Lucas Bernard</div>
              <div className="contact-status">En ligne</div>
            </div>
          </div>
          <div
            className={`contact ${selectedContact === "Responsable de service de menage" ? "active" : ""}`}
            onClick={() => setSelectedContact("Responsable de service de menage")}
          >
            <img src={menage} alt="Nadia Slimani" className="contact-avatar" />
            <div className="contact-info">
              <div className="contact-name">Nadia Slimani</div>
              <div className="contact-status">En ligne</div>
            </div>
          </div>
        </div>
        
        <div className="chat-area">
          <div className="messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message ${msg.incoming ? 'incoming' : 'outgoing'}`}
              >
                <div className="message-content">{msg.content}</div>
                <div className="message-timestamp">{msg.timestamp}</div>
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
    </div>
  );
};

// Composant principal ReceptionistDashboard
const ReceptionistDashboard = () => {
  const [activeSection, setActiveSection] = useState("Tableau de Bord");
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveSection(buttonName);
    switch (buttonName) {
      case "Tableau de Bord":
        navigate("");
        break;
      case "Conversation":
        navigate("conversation");
        break;
      case "Demandes de Réservation":
        navigate("reservation-requests");
        break;
      case "Authentifier une Réservation":
        navigate("authenticate");
        break;
      case "Créer une Réservation":
        navigate("create-reservation");
        break;
      case "Gestion des Chambres":
        navigate("room-management");
        break;
      case "Tâches Administratives":
        navigate("administrative");
        break;
      default:
        navigate("");
        break;
    }
  };

  const handleLogout = () => {
    alert("Déconnexion réussie");
    navigate("/employee");
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        buttons={[
          { name: "Tableau de Bord", icon: <FaHome /> },
          { name: "Conversation", icon: <FaComments /> },
          { name: "Demandes de Réservation", icon: <FaUserCheck /> },
          { name: "Authentifier une Réservation", icon: <FaCheckCircle /> },
          { name: "Créer une Réservation", icon: <FaPlus /> },
          { name: "Gestion des Chambres", icon: <FaBed /> },
          { name: "Tâches Administratives", icon: <FaClipboardList /> },
        ]}
        onButtonClick={handleButtonClick}
        activeButton={activeSection}
        onLogout={handleLogout}
        dashboardName="Tableau de Bord Réceptionniste"
        profileImage={profilereceptioniste}
      />
      <div className="main-content">
        <header className="dashboard-header">
          <h1>{activeSection}</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/reservation-requests" element={<ReservationRequests />} />
          <Route path="/authenticate" element={<AuthenticateReservation />} />
          <Route path="/create-reservation" element={<CreateReservation />} />
          <Route path="/room-management" element={<RoomManagement />} />
          <Route path="/administrative" element={<AdministrativeTasks />} />
        </Routes>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;