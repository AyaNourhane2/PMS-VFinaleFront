/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
 
  FaUserCheck,
 
  FaClipboardList,
  FaHome,
  FaChartBar, // Add this line
  FaCoins, 
  FaComments,
  
} from "react-icons/fa";
import profilereceptioniste from "../assets/profilereceptioniste.webp";
import admin from "../assets/admin.jpg";
import menage from "../assets/menage.jpg";
import compatible from "../assets/compatible.jpg";


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
    // Logique pour enregistrer l'arrivée du client
    alert(`Client ${guestInfo.name} enregistré dans la chambre ${roomAssignment.roomNumber}!`);
  };

  
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
    },
    {
      id: 3,
      guestName: "Pierre Lambert",
      checkInDate: "2023-12-05",
      checkOutDate: "2023-12-10",
      roomType: "Chambre Familiale",
      guests: 5,
      specialRequests: "",
      status: "Approuvée",
      submittedAt: "2023-10-30 16:45"
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
              
              <div className="detail-group">
                <label>Nombre de personnes :</label>
                <p>{request.guests}</p>
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
    reservationNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    email: "",
    country: "",
    phoneNumber: "",
    address: "",
    documentType: "passport",
    documentNumber: "",
    specialRequests: { babyBed: false, highFloor: false, other: "" },
    additionalServices: { gym: false, spa: false, restaurant: false, emergency: false },
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in reservation.specialRequests || name in reservation.additionalServices) {
      setReservation(prev => ({
        ...prev,
        [name.includes("special") ? "specialRequests" : "additionalServices"]: {
          ...prev[name.includes("special") ? "specialRequests" : "additionalServices"],
          [name]: value === "on" ? !prev[name.includes("special") ? "specialRequests" : "additionalServices"][name] : value
        }
      }));
    } else {
      setReservation({ ...reservation, [name]: value });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("Réservation créée avec succès !");
      setReservation({
        reservationNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        email: "",
        country: "",
        phoneNumber: "",
        address: "",
        documentType: "passport",
        documentNumber: "",
        specialRequests: { babyBed: false, highFloor: false, other: "" },
        additionalServices: { gym: false, spa: false, restaurant: false, emergency: false },
        paymentMethod: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
      });
      setStep(1);
    } catch (err) {
      setMessage("Erreur lors de la création de la réservation.");
    }
  };

  return (
    <div className="form-container">
      <h2>Créer une Nouvelle Réservation</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h3>Étape 1: Sélection des dates</h3>
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
            <div className="form-actions">
              <button type="button" className="btn" onClick={nextStep}>Suivant</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Étape 2: Informations personnelles</h3>
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
              <label>Prenom du client</label>
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
              <label>Pays</label>
              <input
                type="text"
                name="country"
                value={reservation.country}
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
              <label>Adresse d'habitat</label>
              <input
                type="text"
                name="address"
                value={reservation.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Type de document</label>
              <select
                name="documentType"
                value={reservation.documentType}
                onChange={handleChange}
                required
              >
                <option value="passport">Passeport</option>
                <option value="nationalId">Carte Nationale</option>
              </select>
            </div>
            <div className="form-group">
              <label>Numéro du document</label>
              <input
                type="text"
                name="documentNumber"
                value={reservation.documentNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Demandes spéciales</label>
              <div>
              <label><input type="checkbox" name="gym" checked={reservation.additionalServices.gym} onChange={handleChange} /> Lit bébé</label>
              <label><input type="checkbox" name="spa" checked={reservation.additionalServices.spa} onChange={handleChange} /> Etage élevé</label>
              <label>Autre</label>
              <input
                type="text"
                name="autre"
                value={reservation.autre}
                onChange={handleChange}
                required
              />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="button" className="btn" onClick={nextStep}>Suivant</button>
            </div>
          </div>
        )}

{step === 3 && (
          <div className="form-step">
            <h3>Étape 3: Services additionnels</h3>
            <div className="form-group">
              <h3>GYM</h3>
              <div>
                <label><input type="radio" name="gym" value="cardio" checked={reservation.additionalServices.gym === "cardio"} onChange={handleChange} /> Cardio Training (6H-22H)</label>
                <label><input type="radio" name="gym" value="muscu" checked={reservation.additionalServices.gym === "muscu"} onChange={handleChange} /> Musculation (7H-21H)</label>
                <label><input type="radio" name="gym" value="yoga" checked={reservation.additionalServices.gym === "yoga"} onChange={handleChange} /> Yoga (8H-20H)</label>
              </div>
            </div>
            <div className="form-group">
            <h3>SPA</h3>
              <div>
                <label><input type="radio" name="spa" value="massage" checked={reservation.additionalServices.spa === "massage"} onChange={handleChange} /> Massage (10H-20H)</label>
                <label><input type="radio" name="spa" value="face" checked={reservation.additionalServices.spa === "face"} onChange={handleChange} /> Soins de visage (9H-18H)</label>
                <label><input type="radio" name="spa" value="feet" checked={reservation.additionalServices.spa === "feet"} onChange={handleChange} /> Soins des pieds (11H-19H)</label>
              </div>
            </div>
            <div className="form-group">
            <h3>RESTAURATION</h3>              <div>
                <label><input type="radio" name="restaurant" value="breakfast" checked={reservation.additionalServices.restaurant === "breakfast"} onChange={handleChange} /> Petit déjeuner (1493.40 DA)</label>
                <label><input type="radio" name="restaurant" value="restaurant" checked={reservation.additionalServices.restaurant === "restaurant"} onChange={handleChange} /> Restaurant (1493.40 DA)</label>
                <label><input type="radio" name="restaurant" value="cafeteria" checked={reservation.additionalServices.restaurant === "cafeteria"} onChange={handleChange} /> Cafeteria (1493.40 DA)</label>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="button" className="btn" onClick={nextStep}>Suivant</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-step">
            <h3>Étape 4: Mode de paiement</h3>
            <div className="form-group">
              <label>Mode de paiement</label>
              <select
                name="paymentMethod"
                value={reservation.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un mode</option>
                <option value="card">Carte bancaire</option>
                <option value="transfer">Virement</option>
                <option value="check">Chèque</option>
              </select>
            </div>
            {reservation.paymentMethod === "card" && (
              <>
                <div className="form-group">
                  <label>Numéro de carte</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={reservation.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
              <label>Date d'expiration</label>
              <input
                type="date"
                name="checkInDate"
                value={reservation.checkInDate}
                onChange={handleChange}
                required
              />
                </div>
                <div className="form-group">
                  <label>Cryptogramme visuel (CVV)</label>
                  <input
                    type="text"
                    name="cvv"
                    value={reservation.cvv}
                    onChange={handleChange}
                    required
                    maxLength="4"
                  />
                </div>
                <div className="form-group">
                  <label>nom du titulaire de la carte</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={reservation.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="form-actions">
              <button type="button" className="btn secondary" onClick={prevStep}>Précédent</button>
              <button type="submit" className="btn">Finaliser la Réservation</button>
            </div>
          </div>
        )}
      </form>
      {message && <p className="message success">{message}</p>}
    </div>
  );
}
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
      image: room1001, // Utiliser l'image locale
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
      image: room1002, // Utiliser l'image locale
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
      image: room1003, // Utiliser l'image locale
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
      image: room1004, // Utiliser l'image locale
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
      image: room1005, // Utiliser l'image locale
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
      image: room1006, // Utiliser l'image locale
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
      image: room1007, // Utiliser l'image locale
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
      image: room1008, // Utiliser l'image locale
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
      image: room1009, // Utiliser l'image locale
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");

  // Filtrer les chambres en fonction du statut et de l'étage
  const filteredRooms = rooms.filter((room) => {
    const statusMatch = filter === "all" || room.status === filter;
    const floorMatch = floorFilter === "all" || room.floor === floorFilter;
    return statusMatch && floorMatch;
  });

  // Modifier le statut d'une chambre
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

      {/* Filtres */}
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

      {/* Tableau des chambres */}
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
    // Nouvelles tâches ajoutées
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

  // Toggle task status (done/undone)
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Add a new task
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

  // Filter tasks based on category and priority
  const filteredTasks = tasks.filter(task => {
    const categoryMatch = categoryFilter === "all" || task.category === categoryFilter;
    const priorityMatch = priorityFilter === "all" || task.priority === priorityFilter;
    return categoryMatch && priorityMatch;
  });

  return (
    <div className="container administrative-tasks">
      <h2>Liste des Tâches à Faire (To-Do)</h2>

      {/* Filters */}
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

        {/* Add New Task Form */}
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

      {/* Task List */}
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

// Composant pour la gestion des conversations (Réceptionniste <-> Administrateur)
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

      // Simulate reply after 1 second
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
    <div className="chat-section">
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
          <div
            className={`contact ${selectedContact === "Responsable de service compatible" ? "active" : ""}`}
            onClick={() => setSelectedContact("Responsable de service compatible")}
          >
            <img src={compatible} alt="Thomas Moreau" className="contact-avatar" />
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
                {selectedContact === "Admin" 
                  ? "Lucas Bernard (Administrateur)" 
                  : selectedContact === "Responsable de service de menage" 
                    ? "Nadia Slimani (Service de ménage)" 
                    : "Thomas Moreau (Service compatible)"}
              </div>
              <div className="chat-status">En ligne</div>
            </div>
          </div>
          
          <div className="messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message ${msg.incoming ? 'admin' : 'receptionist'}`}
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
            <button onClick={handleSendMessage}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour gérer les approbations/refus des réservations (Administrateur)
const AdminReservationApproval = () => {
  const [reservations, setReservations] = useState([
    { id: 1, guestName: "John Doe", room: "101", status: "En attente" },
    { id: 2, guestName: "Jane Smith", room: "102", status: "En attente" },
  ]);

  const handleApprove = (id) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "Approuvée" } : res
      )
    );
  };

  const handleReject = (id) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "Rejetée" } : res
      )
    );
  };

  return (
    <div className="container admin-reservation-approval">
      <h2>Gestion des Réservations (Administrateur)</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom du Client</th>
            <th>Chambre</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.guestName}</td>
              <td>{res.room}</td>
              <td>{res.status}</td>
              <td>
                {res.status === "En attente" && (
                  <>
                    <button className="btn approve" onClick={() => handleApprove(res.id)}>
                      Approuver
                    </button>
                    <button className="btn reject" onClick={() => handleReject(res.id)}>
                      Rejeter
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Composant ReceptionistDashboard
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
        case "Gestion des Approbations":
          navigate("approval");
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
        case "Demandes de Réservation":
      navigate("reservation-requests");
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
          <Route path="/welcome" element={<GuestWelcome />} />
          <Route path="/authenticate" element={<AuthenticateReservation />} />
          <Route path="/create-reservation" element={<CreateReservation />} />
          <Route path="/departure" element={<GuestDeparture />} />
          
          <Route path="/room-management" element={<RoomManagement />} />
          <Route path="/client-management" element={<ClientManagement />} />
          <Route path="/administrative" element={<AdministrativeTasks />} />
          
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/reservation-requests" element={<ReservationRequests />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;