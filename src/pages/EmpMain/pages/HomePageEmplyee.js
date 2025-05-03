import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/HomePage.css";

// Importation des images
import receptionistImage from "../assets/receptioniste.webp";
import housekeepingImage from "../assets/personnel de menage.webp";
import serviceImage from "../assets/service compatible.webp";

const HomePage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 1,
      name: "Réceptionniste",
      image: receptionistImage,
      description: "Gestion des réservations, des clients et des factures.",
      path: "/employee/receptionist",
    },
    {
      id: 2,
      name: "Femme de Ménage",
      image: housekeepingImage,
      description: "Gestion du nettoyage des chambres et des produits.",
      path: "/employee/housekeeping",
    },
    {
      id: 3,
      name: "Service Compatible",
      image: serviceImage,
      description: "Gestion des commandes et des services additionnels.",
      path: "/employee/accounting",
    },
  ];

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
              <button className="role-button" onClick={() => navigate(role.path)}>
                Voir Détails
              </button>
            </div>
            <h2>{role.name}</h2>
            <p>{role.description}</p>
          </div>
        ))}
      </div>

      <button className="service-button" onClick={() => navigate("/employee/services")}>
        Service Général
      </button>
    </div>
  );
};

export default HomePage;