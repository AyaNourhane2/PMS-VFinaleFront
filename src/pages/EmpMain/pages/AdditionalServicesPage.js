import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdditionalServicesPage.css";
import restaurationImage from "../assets/restauration.webp";
import spaImage from "../assets/spa.webp";
import gymImage from "../assets/gym2.webp";
import urgentImage from "../assets/urgent.webp";

// Import des icônes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUtensils,  
  faDumbbell,
  faSpa, 
  faFire
} from "@fortawesome/free-solid-svg-icons";

const AdditionalServicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Liste des services additionnels (sans service d'étage)
  const services = [
    { id: 1, name: "Restauration", description: "Commander des repas en chambre.", image: restaurationImage, icon: faUtensils },
    { id: 2, name: "Gym", description: "Accéder à la salle de sport et aux équipements.", image: gymImage, icon: faDumbbell },
    { id: 3, name: "Spa", description: "Réserver des séances de massage ou de bien-être.", image: spaImage, icon: faSpa },
    { id: 4, name: "Service Urgent", description: "Demander une assistance urgente.", image: urgentImage, icon: faFire },
  ];

  // Filtrer les services en fonction du terme de recherche
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer le clic sur une carte
  const handleServiceClick = (serviceId) => {
    navigate(`/employee/services/${serviceId}`);
  };

  return (
    <div className="services-page">
      <h1 className="additional-services-title">Services Additionnels</h1>

      <input
        type="text"
        className="search-filter"
        placeholder="Rechercher un service..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="services-list">
        {filteredServices.map((service) => (
          <div 
            key={service.id} 
            className="service-card" 
            onClick={() => handleServiceClick(service.id)}
            style={{ 
              backgroundImage: `url(${service.image})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center", 
              backgroundRepeat: "no-repeat", 
              color: "white", 
              padding: "20px", 
              borderRadius: "10px", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center", 
              alignItems: "center", 
              height: "200px", 
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)"
            }}
          >
            <FontAwesomeIcon icon={service.icon} className="icon" />
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      
      <button className="back-button" onClick={() => navigate("/employee")}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default AdditionalServicesPage;