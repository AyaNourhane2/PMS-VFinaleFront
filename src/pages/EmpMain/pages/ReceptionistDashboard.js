/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import room1001 from "../assets/room1001.png";
import room1002 from "../assets/room1002.png";
import room1003 from "../assets/room1003.png";
import room1004 from "../assets/room1004.png";
import room1005 from "../assets/room1005.png";
import room1006 from "../assets/room1006.png";
import room1007 from "../assets/room1007.png";
import room1008 from "../assets/room1008.png";
import room1009 from "../assets/room1009.png";
import { 
  FaCheckCircle, 
  FaPlus, 
  FaSignOutAlt, 
  FaBed, 
  FaUsers, 
  FaChartLine,
  FaUserCheck,
  FaQuestionCircle,
  FaClipboardList,
  FaHome,
  FaChartBar,
  FaCoins, 
} from "react-icons/fa";
import profilereceptioniste from "../assets/profilereceptioniste.webp";

import "../components/sidebar.css";
import "../Style/receptioniste.css";

// Composant Sidebar
const Sidebar = ({ buttons, onButtonClick, activeButton, onLogout, dashboardName, profileImage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "◄" : "►"}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="profile-section">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <h1>{dashboardName}</h1>
        </div>
        <nav>
          <ul>
            {buttons.map((button, index) => (
              <li
                key={index}
                className={button.name === activeButton ? "active" : ""}
                onClick={() => onButtonClick(button.name)}
              >
                <span className="icon">{button.icon}</span>
                <span className="title">{button.name}</span>
              </li>
            ))}
            <li onClick={onLogout}>
              <span className="icon"><FaSignOutAlt /></span>
              <span className="title">Déconnexion</span>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

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
          <div className="action-buttons">
            <button className="btn" onClick={handleCheckArrivals}>
              Vérifier les arrivées
            </button>
            <button className="btn" onClick={handleCheckDepartures}>
              Vérifier les départs
            </button>
            <button className="btn" onClick={handleViewAvailableRooms}>
              Voir les chambres disponibles
            </button>
          </div>
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
      <h2>Accueil des Clients</h2>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h3>Étape 1: Informations client</h3>
            <div className="form-group">
              <label>Nom complet du client</label>
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
              <label>Numéro de pièce d'identité/passeport</label>
              <input
                type="text"
                name="idNumber"
                value={guestInfo.idNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Adresse</label>
              <input
                type="text"
                name="address"
                value={guestInfo.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Préférences de chambre</label>
              <input
                type="text"
                name="roomPreference"
                value={guestInfo.roomPreference}
                onChange={handleChange}
                placeholder="Étage, vue, lit double, etc."
              />
            </div>
            <div className="form-group">
              <label>Demandes spéciales</label>
              <textarea
                name="specialRequests"
                value={guestInfo.specialRequests}
                onChange={handleChange}
                rows="3"
              ></textarea>
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
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Familiale">Familiale</option>
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
              <h4>Informations client</h4>
              <p><strong>Nom:</strong> {guestInfo.name}</p>
              <p><strong>Réservation:</strong> {guestInfo.reservationNumber}</p>
              <p><strong>ID:</strong> {guestInfo.idNumber}</p>
              
              <h4>Attribution de chambre</h4>
              <p><strong>Chambre:</strong> {roomAssignment.roomNumber}</p>
              <p><strong>Étage:</strong> {roomAssignment.floor}</p>
              <p><strong>Type:</strong> {roomAssignment.roomType}</p>
              
              <h4>Services inclus</h4>
              <ul>
                <li>Petit-déjeuner buffet (7h-10h)</li>
                <li>Accès à la piscine</li>
                <li>Wi-Fi gratuit</li>
              </ul>
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="submit" className="btn">Finaliser l'enregistrement</button>
            </div>
          </div>
        )}
      </form>
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
    reservationNumber: "",
    guestName: "",
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
    email: "",
    phoneNumber: "",
    numberOfGuests: 1,
    specialRequests: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simuler une création de réservation
      setMessage("Réservation créée avec succès !");
      setReservation({
        reservationNumber: "",
        guestName: "",
        checkInDate: "",
        checkOutDate: "",
        roomType: "",
        email: "",
        phoneNumber: "",
        numberOfGuests: 1,
        specialRequests: "",
      });
    } catch (err) {
      setMessage("Erreur lors de la création de la réservation.");
    }
  };

  return (
    <div className="form-container">
      <h2>Créer une Nouvelle Réservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numéro de réservation</label>
          <input
            type="text"
            name="reservationNumber"
            value={reservation.reservationNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom du client</label>
          <input
            type="text"
            name="guestName"
            value={reservation.guestName}
            onChange={handleChange}
            required
          />
        </div>
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
            <option value="">Sélectionnez un type de chambre</option>
            <option value="Chambre Standard">Chambre Standard</option>
            <option value="Suite Deluxe">Suite Deluxe</option>
            <option value="Chambre Familiale">Chambre Familiale</option>
          </select>
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
          <label>Numéro de téléphone</label>
          <input
            type="text"
            name="phoneNumber"
            value={reservation.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de personnes</label>
          <input
            type="number"
            name="numberOfGuests"
            value={reservation.numberOfGuests}
            onChange={handleChange}
            min="1"
            max="30"
            required
          />
        </div>
        <div className="form-group">
          <label>Commentaires ou demandes spéciales</label>
          <textarea
            name="specialRequests"
            value={reservation.specialRequests}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="btn">Créer la Réservation</button>
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
    { id: 3, name: "Blanchisserie", amount: 0, checked: false },
    { id: 4, name: "Dommages", amount: 0, checked: false },
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
    // Logique pour traiter le départ
    const totalCharges = additionalCharges
      .filter(charge => charge.checked)
      .reduce((sum, charge) => sum + charge.amount, 0);
    
    const totalAmount = 200 + totalCharges; // 200€ pour la chambre par exemple
    
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
            <option value="Virement">Virement</option>
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

// Composant GuestAssistance
const GuestAssistance = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: "Problème de chambre", description: "" },
    { id: 2, type: "Demande touristique", description: "" },
    { id: 3, type: "Service supplémentaire", description: "" },
    { id: 4, type: "Autre", description: "" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [description, setDescription] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [priority, setPriority] = useState("normal");
  const [submittedRequests, setSubmittedRequests] = useState([]);

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest || !description) return;
    
    const newRequest = {
      id: Date.now(),
      type: selectedRequest,
      description,
      roomNumber,
      priority,
      status: "Nouveau",
      timestamp: new Date().toLocaleString()
    };
    
    setSubmittedRequests([...submittedRequests, newRequest]);
    setDescription("");
    setRoomNumber("");
    setPriority("normal");
    setSelectedRequest(null);
    
    alert("Demande enregistrée avec succès!");
  };

  return (
    <div className="container guest-assistance">
      <h2>Assistance Client</h2>
      
      <div className="assistance-grid">
        <div className="request-form">
          <h3>Nouvelle demande</h3>
          <div className="form-group">
            <label>Type de demande</label>
            <select
              value={selectedRequest || ""}
              onChange={(e) => setSelectedRequest(e.target.value)}
              required
            >
              <option value="">Sélectionner un type</option>
              {requests.map(request => (
                <option key={request.id} value={request.type}>{request.type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Numéro de chambre (optionnel)</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Priorité</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Basse</option>
              <option value="normal">Normale</option>
              <option value="high">Haute</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description détaillée</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>

          <button 
            type="button" 
            className="btn" 
            onClick={handleRequestSubmit}
            disabled={!selectedRequest || !description}
          >
            Soumettre la demande
          </button>
        </div>

        <div className="quick-links">
          <h3>Informations utiles</h3>
          <ul>
            <li>Heures du petit-déjeuner: 7h-10h</li>
            <li>Service de chambre disponible jusqu'à 22h</li>
            <li>Piscine ouverte de 8h à 20h</li>
            <li>Conciergerie disponible 24/7</li>
            <li>Taxi: composer le 9 depuis la chambre</li>
            <li>Médecin de garde: 01 23 45 67 89</li>
          </ul>

          <h3>Attractions locales</h3>
          <ul>
            <li>Musée des Beaux-Arts - 10min à pied</li>
            <li>Centre ville historique - 15min en taxi</li>
            <li>Parc naturel - 5min en voiture</li>
          </ul>
        </div>
      </div>

      {submittedRequests.length > 0 && (
        <div className="request-history">
          <h3>Historique des demandes</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Chambre</th>
                <th>Priorité</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {submittedRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.timestamp}</td>
                  <td>{request.type}</td>
                  <td>{request.roomNumber || "-"}</td>
                  <td className={`priority-${request.priority}`}>
                    {request.priority}
                  </td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: "1001",
      status: "Disponible",
      type: "Chambre Standard",
      floor: "1",
      cleaningStatus: "Propre",
      price: 100,
      checkInDate: "",
      checkOutDate: "",
      image: room1001,
    },
    {
      id: 2,
      number: "1002",
      status: "Occupée",
      type: "Chambre Supérieure",
      floor: "1",
      cleaningStatus: "A nettoyer",
      price: 150,
      checkInDate: "2023-10-25",
      checkOutDate: "2023-10-30",
      image: room1002,
    },
    {
      id: 3,
      number: "1003",
      status: "Maintenance",
      type: "Chambre Deluxe",
      floor: "1",
      cleaningStatus: "En cours",
      price: 200,
      checkInDate: "",
      checkOutDate: "",
      image: room1003,
    },
    {
      id: 4,
      number: "1004",
      status: "Disponible",
      type: "Suite Junior",
      floor: "2",
      cleaningStatus: "Propre",
      price: 250,
      checkInDate: "",
      checkOutDate: "",
      image: room1004,
    },
    {
      id: 5,
      number: "1005",
      status: "Réservée",
      type: "Chambre Deluxe",
      floor: "2",
      cleaningStatus: "Propre",
      price: 200,
      checkInDate: "2023-11-01",
      checkOutDate: "2023-11-05",
      image: room1005,
    },
    {
      id: 6,
      number: "1006",
      status: "Occupée",
      type: "Suite Junior",
      floor: "2",
      cleaningStatus: "A nettoyer",
      price: 250,
      checkInDate: "2023-10-20",
      checkOutDate: "2023-10-25",
      image: room1006,
    },
    {
      id: 7,
      number: "1007",
      status: "Maintenance",
      type: "Chambre Supérieure",
      floor: "2",
      cleaningStatus: "En cours",
      price: 150,
      checkInDate: "",
      checkOutDate: "",
      image: room1007,
    },
    {
      id: 8,
      number: "1008",
      status: "Disponible",
      type: "Chambre Standard",
      floor: "3",
      cleaningStatus: "Propre",
      price: 100,
      checkInDate: "",
      checkOutDate: "",
      image: room1008,
    },
    {
      id: 9,
      number: "1009",
      status: "Réservée",
      type: "Chambre Deluxe",
      floor: "3",
      cleaningStatus: "Propre",
      price: 200,
      checkInDate: "2023-11-10",
      checkOutDate: "2023-11-15",
      image: room1009,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");

  const filteredRooms = rooms.filter((room) => {
    const statusMatch = filter === "all" || room.status === filter;
    const floorMatch = floorFilter === "all" || room.floor === floorFilter;
    return statusMatch && floorMatch;
  });

  const changeRoomStatus = (id, newStatus, checkInDate = "", checkOutDate = "") => {
    setRooms(
      rooms.map((room) =>
        room.id === id
          ? { ...room, status: newStatus, checkInDate, checkOutDate }
          : room
      )
    );
  };

  return (
    <div className="container room-management">
      <h2>Gestion des Chambres</h2>

      <div className="filters">
        <div className="form-group">
          <label>Filtrer par statut:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="Disponible">Disponible</option>
            <option value="Occupée">Occupée</option>
            <option value="Réservée">Réservée</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Filtrer par étage:</label>
          <select
            value={floorFilter}
            onChange={(e) => setFloorFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="1">1er étage</option>
            <option value="2">2ème étage</option>
            <option value="3">3ème étage</option>
          </select>
        </div>
      </div>

      <table className="room-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Numéro</th>
            <th>Étage</th>
            <th>Type</th>
            <th>Prix (€/nuit)</th>
            <th>Statut</th>
            <th>Nettoyage</th>
            <th>Dates de séjour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room.id} className={`status-${room.status.toLowerCase()}`}>
              <td>
                <img src={room.image} alt={`Chambre ${room.number}`} className="room-image" />
              </td>
              <td>{room.number}</td>
              <td>{room.floor}</td>
              <td>{room.type}</td>
              <td>{room.price} €</td>
              <td>{room.status}</td>
              <td>{room.cleaningStatus}</td>
              <td>
                {room.status === "Réservée" ? (
                  <>
                    Du {room.checkInDate} au {room.checkOutDate}
                  </>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {room.status !== "Réservée" ? (
                  <select
                    value={room.status}
                    onChange={(e) => {
                      if (e.target.value === "Réservée") {
                        const checkInDate = prompt(
                          "Entrez la date d'arrivée (AAAA-MM-JJ):"
                        );
                        const checkOutDate = prompt(
                          "Entrez la date de départ (AAAA-MM-JJ):"
                        );
                        if (checkInDate && checkOutDate) {
                          changeRoomStatus(
                            room.id,
                            e.target.value,
                            checkInDate,
                            checkOutDate
                          );
                        }
                      } else {
                        changeRoomStatus(room.id, e.target.value);
                      }
                    }}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Occupée">Occupée</option>
                    <option value="Réservée">Réservée</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                ) : (
                  <button
                    onClick={() => {
                      const confirmChange = window.confirm(
                        "Voulez-vous changer le statut de cette chambre ?"
                      );
                      if (confirmChange) {
                        changeRoomStatus(room.id, "Disponible", "", "");
                      }
                    }}
                  >
                    Annuler la réservation
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ClientManagement = () => {
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", 
      nationality: "USA", idNumber: "PAS123456", room: "101", checkIn: "2023-10-15", checkOut: "2023-10-20" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", 
      nationality: "UK", idNumber: "PAS654321", room: "102", checkIn: "2023-10-16", checkOut: "2023-10-18" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    idNumber: "",
    room: "",
    checkIn: "",
    checkOut: ""
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.room.includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddClient = () => {
    if (newClient.name && newClient.email && newClient.room) {
      const clientToAdd = {
        ...newClient,
        id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1
      };
      
      setClients([...clients, clientToAdd]);
      setNewClient({
        name: "",
        email: "",
        phone: "",
        nationality: "",
        idNumber: "",
        room: "",
        checkIn: "",
        checkOut: ""
      });
      setIsAddingClient(false);
    } else {
      alert("Veuillez remplir au moins le nom, l'email et la chambre");
    }
  };

  const handleDeleteClient = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  return (
    <div className="container client-management">
      <h2>Gestion des Clients</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="add-client-btn" 
          onClick={() => setIsAddingClient(true)}
        >
          Ajouter Client
        </button>
      </div>

      {isAddingClient && (
        <div className="add-client-form">
          <h3>Ajouter un nouveau client</h3>
          <div className="form-row">
            <label>Nom:</label>
            <input 
              type="text" 
              name="name" 
              value={newClient.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-row">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={newClient.email} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-row">
            <label>Téléphone:</label>
            <input 
              type="text" 
              name="phone" 
              value={newClient.phone} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-row">
            <label>Nationalité:</label>
            <input 
              type="text" 
              name="nationality" 
              value={newClient.nationality} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-row">
            <label>ID/Passeport:</label>
            <input 
              type="text" 
              name="idNumber" 
              value={newClient.idNumber} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-row">
            <label>Chambre:</label>
            <input 
              type="text" 
              name="room" 
              value={newClient.room} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="form-row">
            <label>Date d'arrivée:</label>
            <input 
              type="date" 
              name="checkIn" 
              value={newClient.checkIn} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-row">
            <label>Date de départ:</label>
            <input 
              type="date" 
              name="checkOut" 
              value={newClient.checkOut} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-actions">
            <button onClick={handleAddClient}>Confirmer</button>
            <button onClick={() => setIsAddingClient(false)}>Annuler</button>
          </div>
        </div>
      )}

      <table className="client-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Nationalité</th>
            <th>ID/Passeport</th>
            <th>Chambre</th>
            <th>Séjour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.nationality}</td>
              <td>{client.idNumber}</td>
              <td>{client.room}</td>
              <td>{client.checkIn} au {client.checkOut}</td>
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdministrativeTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Vérifier les réservations en ligne", done: false, category: "Réservations", priority: "moyenne" },
    { id: 2, name: "Mettre à jour le PMS", done: false, category: "Système", priority: "haute" },
    { id: 3, name: "Préparer les rapports quotidiens", done: false, category: "Rapports", priority: "basse" },
    { id: 4, name: "Coordonner avec le service de ménage", done: false, category: "Ménage", priority: "moyenne" },
    { id: 5, name: "Vérifier les stocks mini-bar", done: false, category: "Stocks", priority: "haute" },
    { id: 6, name: "Planifier les maintenances", done: false, category: "Maintenance", priority: "moyenne" },
    { id: 7, name: "Gérer les plaintes clients", done: false, category: "Assistance client", priority: "haute" },
    { id: 8, name: "Vérifier les équipements", done: false, category: "Maintenance", priority: "moyenne" },
    { id: 9, name: "Coordonner avec le service restauration", done: false, category: "Réservations", priority: "basse" },
    { id: 10, name: "Préparer les événements spéciaux", done: false, category: "Événements", priority: "haute" },
    { id: 11, name: "Mettre à jour les politiques internes", done: false, category: "Système", priority: "moyenne" },
    { id: 12, name: "Gérer les demandes spéciales", done: false, category: "Assistance client", priority: "haute" },
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
      <h2>Liste des Tâches à Faire (To-Do)</h2>

      <div className="task-controls">
        <div className="form-group">
          <label>Filtrer par catégorie:</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Toutes</option>
            <option value="Réservations">Réservations</option>
            <option value="Système">Système</option>
            <option value="Rapports">Rapports</option>
            <option value="Ménage">Ménage</option>
            <option value="Stocks">Stocks</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Assistance client">Assistance client</option>
            <option value="Événements">Événements</option>
            <option value="Divers">Divers</option>
          </select>
        </div>

        <div className="form-group">
          <label>Filtrer par priorité:</label>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
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

const Statistics = () => {
  const stats = {
    totalReservations: 120,
    occupiedRooms: 45,
    availableRooms: 75,
    checkInsToday: 8,
    checkOutsToday: 5,
    revenue: 12500,
    occupancyRate: 60,
    averageRevenuePerRoom: 250,
    topSourceOfBookings: "Online",
    mostPopularRoomType: "Standard",
  };

  return (
    <div className="statistics-container">
      <h2>Statistiques</h2>
      
      <div className="statistics-grid">
        <div className="stat-card card-reservations">
          <FaChartBar className="stat-icon" />
          <div className="stat-content">
            <h3>Réservations totales</h3>
            <p className="stat-value">{stats.totalReservations}</p>
            <p className="stat-trend">↑ 12% ce mois</p>
          </div>
        </div>

        <div className="stat-card card-occupied">
          <FaBed className="stat-icon" />
          <div className="stat-content">
            <h3>Chambres occupées</h3>
            <p className="stat-value">{stats.occupiedRooms}</p>
            <p className="stat-trend">{stats.occupancyRate}% d'occupation</p>
          </div>
        </div>

        <div className="stat-card card-available">
          <FaBed className="stat-icon" />
          <div className="stat-content">
            <h3>Chambres disponibles</h3>
            <p className="stat-value">{stats.availableRooms}</p>
            <p className="stat-trend">{100 - stats.occupancyRate}% disponibles</p>
          </div>
        </div>

        <div className="stat-card card-revenue">
          <FaCoins className="stat-icon" />
          <div className="stat-content">
            <h3>Revenu mensuel</h3>
            <p className="stat-value">{stats.revenue.toLocaleString()}€</p>
            <p className="stat-trend">↑ 8% vs mois dernier</p>
          </div>
        </div>
      </div>

      <div className="additional-stats">
        <div className="stat-card detailed">
          <h3>Taux d'occupation</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${stats.occupancyRate}%` }}></div>
          </div>
          <p>{stats.occupancyRate}% des chambres sont occupées</p>
        </div>
        <div className="stat-card detailed">
          <h3>Revenu moyen par chambre</h3>
          <p>{stats.averageRevenuePerRoom}€</p>
        </div>
        <div className="stat-card detailed">
          <h3>Source principale de réservations</h3>
          <p>{stats.topSourceOfBookings}</p>
        </div>
        <div className="stat-card detailed">
          <h3>Type de chambre le plus populaire</h3>
          <p>{stats.mostPopularRoomType}</p>
        </div>
      </div>
    </div>
  );
};

// Composant ReceptionistDashboard
const ReceptionistDashboard = () => {
  const [activeSection, setActiveSection] = useState("Tableau de Bord");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith("/welcome")) {
      setActiveSection("Accueil Clients");
    } else if (path.endsWith("/authenticate")) {
      setActiveSection("Authentifier une Réservation");
    } else if (path.endsWith("/create-reservation")) {
      setActiveSection("Créer une Réservation");
    } else if (path.endsWith("/departure")) {
      setActiveSection("Gestion des Départs");
    } else if (path.endsWith("/assistance")) {
      setActiveSection("Assistance Client");
    } else if (path.endsWith("/room-management")) {
      setActiveSection("Gestion des Chambres");
    } else if (path.endsWith("/client-management")) {
      setActiveSection("Gestion des Clients");
    } else if (path.endsWith("/administrative")) {
      setActiveSection("Tâches Administratives");
    } else if (path.endsWith("/statistics")) {
      setActiveSection("Statistiques");
    } else {
      setActiveSection("Tableau de Bord");
    }
  }, [location]);

  const handleButtonClick = (buttonName) => {
    setActiveSection(buttonName);
    switch (buttonName) {
      case "Tableau de Bord":
        navigate("");
        break;
      case "Accueil Clients":
        navigate("welcome");
        break;
      case "Authentifier une Réservation":
        navigate("authenticate");
        break;
      case "Créer une Réservation":
        navigate("create-reservation");
        break;
      case "Gestion des Départs":
        navigate("departure");
        break;
      case "Assistance Client":
        navigate("assistance");
        break;
      case "Gestion des Chambres":
        navigate("room-management");
        break;
      case "Gestion des Clients":
        navigate("client-management");
        break;
      case "Tâches Administratives":
        navigate("administrative");
        break;
      case "Statistiques":
        navigate("statistics");
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
          { name: "Accueil Clients", icon: <FaUserCheck /> },
          { name: "Authentifier une Réservation", icon: <FaCheckCircle /> },
          { name: "Créer une Réservation", icon: <FaPlus /> },
          { name: "Gestion des Départs", icon: <FaSignOutAlt /> },
          { name: "Assistance Client", icon: <FaQuestionCircle /> },
          { name: "Gestion des Chambres", icon: <FaBed /> },
          { name: "Gestion des Clients", icon: <FaUsers /> },
          { name: "Tâches Administratives", icon: <FaClipboardList /> },
          { name: "Statistiques", icon: <FaChartLine /> },
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
          <Route index element={<HomeDashboard />} />
          <Route path="welcome" element={<GuestWelcome />} />
          <Route path="authenticate" element={<AuthenticateReservation />} />
          <Route path="create-reservation" element={<CreateReservation />} />
          <Route path="departure" element={<GuestDeparture />} />
          <Route path="assistance" element={<GuestAssistance />} />
          <Route path="room-management" element={<RoomManagement />} />
          <Route path="client-management" element={<ClientManagement />} />
          <Route path="administrative" element={<AdministrativeTasks />} />
          <Route path="statistics" element={<Statistics />} />
        </Routes>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;