


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/HomePage.css";
import LoginModal from "../pages/LoginModal";
import { FaSignOutAlt } from "react-icons/fa"; // Import de l'icône de déconnexion

// Importation des images
import receptionistImage from "../assets/receptioniste.webp";
import housekeepingImage from "../assets/personnel de menage.webp";
import serviceImage from "../assets/service compatible.webp";

const HomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedRolePath, setSelectedRolePath] = useState("");

  const roles = [
    {
      id: 1,
      name: "Agent d'accueil",
      image: receptionistImage,
      description: "Gestion des réservations, des clients et des factures.",
      path: "/employee/receptionist",
    },
    {
      id: 2,
      name: "Chef d'équipe propreté",
      image: housekeepingImage,
      description: "Gestion du nettoyage des chambres et des produits.",
      path: "/employee/housekeeping",
    },
    {
      id: 3,
      name: "Gestionnaire de service compatible",
      image: serviceImage,
      description: "Gestion des commandes et des services additionnels.",
      path: "/employee/accounting",
    },
  ];

  const handleRoleClick = (path) => {
    setSelectedRolePath(path);
    setShowModal(true);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Bienvenue à RoyelStay où confort et élégance se rencontrent !</h1>
      </div>

      <div className="roles-list">
        {roles.map((role) => (
          <div key={role.id} className="role-card">
            <img src={role.image} alt={role.name} className="role-image" />
            <div className="overlay">
              <button 
                className="role-button" 
                onClick={() => handleRoleClick(role.path)}
              >
                Voir Détails
              </button>
            </div>
            <h2>{role.name}</h2>
            <p>{role.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <LoginModal 
          rolePath={selectedRolePath} 
          onClose={() => setShowModal(false)} 
        />
      )}

      <div className="action-buttons">
        <button 
          className="service-button" 
          onClick={() => navigate("/employee/services")}
        >
          Service Général
        </button>
        <button 
          className="service-button logout-button" 
          onClick={handleLogout}
        >
          <FaSignOutAlt className="button-icon" /> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default HomePage;