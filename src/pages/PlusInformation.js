import React, { useState } from 'react';
import gymImage from '../asset/gym.webp';
import restaurationImage from '../asset/restauration.webp';
import spaImage from '../asset/spa.webp';
import emergencyImage from '../asset/emergency.webp';

import './LearnMore.css';

const LearnMore = () => {
  const [isClicked, setIsClicked] = useState(null);
  const [showDetails, setShowDetails] = useState(Array(4).fill(false)); // 4 services
  

  const handleCardClick = (index) => {
    setIsClicked(index);
    setTimeout(() => setIsClicked(null), 300);
  };

  const toggleDetails = (index) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  

  return (
    <div className="container">
      <div className="grid-container">
        {[
          {
            image: gymImage,
            icon: 'fas fa-dumbbell',
            title: 'Gym',
            description: 'Notre salle de sport est équipée d\'appareils modernes et d\'un espace dédié aux exercices libres.',
            details: [
              'Équipements : Tapis de course, haltères, machines de musculation, vélos elliptiques.',
              'Heures d\'ouverture : 24/7.',
              'Services inclus : Cours collectifs (yoga, pilates, spinning), vestiaires avec douches, coachs personnels disponibles sur demande.',
              'Offres spéciales : Abonnement gratuit pour le premier mois, réduction de 10% pour les étudiants.',
              'Avis clients : "La salle est impeccable et les coachs sont très professionnels." - Jean D.',
            ],
          },
          {
            image: restaurationImage,
            icon: 'fas fa-utensils',
            title: 'Restauration',
            description: 'Découvrez notre restaurant étoilé, où chaque plat est préparé avec des ingrédients frais et locaux.',
            details: [
              'Spécialités : Cuisine française, italienne et asiatique.',
              'Menu : Petit-déjeuner, déjeuner, dîner, brunch dominical.',
              'Options : Plats végétariens, sans gluten et vegan disponibles.',
              'Offres spéciales : Menu dégustation à 5 plats pour deux personnes à 99€, cocktails maison offerts après 18h.',
              'Avis clients : "Une expérience culinaire inoubliable !" - Marie L.',
            ],
          },
          {
            image: spaImage,
            icon: 'fas fa-spa',
            title: 'Spa',
            description: 'Offrez-vous un moment de détente dans notre spa haut de gamme.',
            details: [
              'Soins disponibles : Massages relaxants, enveloppements corporels, soins du visage, manucure/pédicure.',
              'Produits utilisés : Marques biologiques et naturelles (L\'Occitane, Nuxe).',
              'Réservation : Sur place ou en ligne.',
              'Offres spéciales : Forfait journée complète incluant accès au sauna, hammam et piscine à 120€.',
              'Avis clients : "Un havre de paix et de relaxation." - Sophie R.',
            ],
          },
          {
            image: emergencyImage,
            icon: 'fas fa-medkit',
            title: 'Service d\'urgence',
            description: 'Votre sécurité est notre priorité. Notre équipe médicale est disponible 24/7.',
            details: [
              'Disponibilité : 24 heures sur 24, 7 jours sur 7.',
              'Équipe médicale : Médecins et infirmiers qualifiés, spécialistes en premiers secours.',
              'Contact : Appuyez simplement sur le bouton d\'urgence dans votre chambre ou appelez le +33 1 23 45 67 89.',
              'Services supplémentaires : Consultations médicales programmées, pharmacie disponible 24/7.',
              'Avis clients : "Réponse rapide et professionnelle en cas d\'urgence." - Pierre M.',
            ],
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`card ${isClicked === index ? 'clicked' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="image-icon-container">
              <img src={item.image} alt={item.title} className="circle-image" />
              <div className="icon-circle">
                <i className={item.icon}></i>
              </div>
            </div>
            <div className="card-content">
              <h2 className="card-title">{item.title}</h2>
              <p className="card-description">{item.description}</p>
              <button
                className="toggle-details-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(index);
                }}
              >
                {showDetails[index] ? 'Masquer les détails' : 'Afficher les détails'}
              </button>
              <div className={`card-details ${showDetails[index] ? 'show' : ''}`}>
                <ul>
                  {item.details.map((detail, i) => (
                    <li key={i} className="list-item">{detail}</li>
                  ))}
                </ul>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnMore;