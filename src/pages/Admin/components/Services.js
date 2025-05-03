import React, { useState } from 'react';
import '../styles/Services.css'; // Assurez-vous que ce fichier contient les styles CSS
import restaurantImage from '../assets/restaurant1.webp';
import spaImage from '../assets/spa1.webp';
import emergencyImage from '../assets/urgence1.webp';
import gymImage from '../assets/gym1.webp';
import roomServiceImage from '../assets/roomservice1.webp';
import { FaUtensils, FaSpa, FaMedkit, FaDumbbell, FaConciergeBell } from 'react-icons/fa';

// Composant ServiceCard pour chaque service
const ServiceCard = React.memo(({ service, isActive, onClick }) => {
  return (
    <div
      className={`service-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      aria-expanded={isActive}
      tabIndex="0"
    >
      <div className="icon-container">{service.icon}</div>
      <img
        src={service.image}
        alt={service.name}
        className="service-image"
      />
      <h3 className="service-name">{service.name}</h3>
      <p className="service-description">{service.description}</p>

      {/* Affichage des détails si le service est actif */}
      {isActive && (
        <div className="service-details">
          <h4>Détails :</h4>
          <ul className="details-list">
            {service.details.map((detail, idx) => (
              <li key={idx} className="detail-item">
                <strong>{detail.name}</strong>: {detail.description}
                {detail.price && <span className="detail-price"> - Prix: {detail.price}</span>}
                {detail.hours && <span className="detail-hours"> - Heures: {detail.hours}</span>}
                {detail.team && <span className="detail-team"> - Équipe: {detail.team}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

function Services() {
  const [activeService, setActiveService] = useState(null);

  // Données des services avec détails supplémentaires
  const services = [
    {
      name: 'Restauration Premium',
      description: 'Profitez de nos délicieux plats préparés par nos chefs étoilés. Cuisine locale et internationale à votre disposition.',
      image: restaurantImage,
      icon: <FaUtensils className="service-icon" />,
      details: [
        { name: "Steak Frites", description: "Steak juteux accompagné de frites croustillantes." },
        { name: "Pâtes Carbonara", description: "Pâtes crémeuses avec lardons et parmesan." },
        { name: "Salade César", description: "Salade fraîche avec poulet grillé, croûtons et sauce césar." },
        { name: "Burger Gourmet", description: "Burger avec steak haché, cheddar, bacon et sauce maison." },
        { name: "Pizza Margherita", description: "Pizza classique avec tomate, mozzarella et basilic." },
        { name: "Sushi Mix", description: "Assortiment de sushis frais (saumon, thon, crevette)." },
        { name: "Tiramisu", description: "Dessert italien au café et mascarpone." },
        { name: "Crème Brûlée", description: "Crème onctueuse avec une couche de sucre caramélisé." },
      ],
    },
    {
      name: 'Spa & Bien-être',
      description: 'Détendez-vous avec nos soins spa de luxe. Massages, soins du visage et bains relaxants vous attendent.',
      image: spaImage,
      icon: <FaSpa className="service-icon" />,
      details: [
        { name: "Massage", price: "70€", hours: "10h - 20h", team: "Équipe Bien-être", description: "Massage relaxant pour détendre vos muscles." },
        { name: "Soins du Visage", price: "50€", hours: "9h - 18h", team: "Équipe Beauté", description: "Soins hydratants et anti-âge pour votre visage." },
        { name: "Soins des Pieds", price: "40€", hours: "11h - 19h", team: "Équipe Podologie", description: "Pédicure et soins des pieds pour un confort optimal." },
      ],
    },
    {
      name: 'Assistance Médicale',
      description: 'Notre service d\'urgence est disponible 24/7 pour assurer votre sécurité et votre bien-être.',
      image: emergencyImage,
      icon: <FaMedkit className="service-icon" />,
      details: [
        { name: "Appeler un Docteur", description: "Contactez un médecin en cas d'urgence médicale." },
        { name: "Signaler un Feu", description: "Signalez un incendie dans votre chambre ou ailleurs." },
        { name: "Appeler la Sécurité", description: "Contactez la sécurité en cas de problème." },
      ],
    },
    {
      name: 'Centre Fitness',
      description: 'Maintenez votre routine sportive dans notre salle de sport entièrement équipée, ouverte 24h/24.',
      image: gymImage,
      icon: <FaDumbbell className="service-icon" />,
      details: [
        { name: "Cardio Training", price: "30€", hours: "6h - 22h", team: "Équipe Fitness", description: "Séances de cardio pour améliorer votre endurance." },
        { name: "Musculation", price: "40€", hours: "7h - 21h", team: "Équipe Bodybuilding", description: "Exercices de musculation pour renforcer vos muscles." },
        { name: "Yoga", price: "35€", hours: "8h - 20h", team: "Équipe Relaxation", description: "Séances de yoga pour améliorer votre flexibilité et votre bien-être." },
      ],
    },
    
  ];

  // Gestion du clic sur un service
  const handleServiceClick = (serviceName) => {
    setActiveService(activeService === serviceName ? null : serviceName); // Toggle
  };

  return (
    <div className="services-container">
      <h2 className="services-title">Nos Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            isActive={activeService === service.name}
            onClick={() => handleServiceClick(service.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;