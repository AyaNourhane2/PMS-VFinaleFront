import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/ServiceDetailsPage.css";
import SteakFritesImage from "../assets/Steak Frites.webp";
import PatesCarbonaraImage from "../assets/Pâtes Carbonara.webp";
import SaladeCesarImage from "../assets/Salade César.webp";
import BurgerGourmetImage from "../assets/Burger Gourmet.webp";
import PizzaMargheritaImage from "../assets/Pizza Margherita.webp";
import SushiMixImage from "../assets/Sushi Mix.webp";
import TiramisuImage from "../assets/Tiramisu.webp";
import CremeBruleeImage from "../assets/Crème Brûlée.webp";
import GymImage from "../assets/gym2.webp";
import MassageImage from "../assets/massage.webp";
import MusculationImage from "../assets/Musculation.webp";
import DoctorImage from "../assets/doctor.webp";
import FeuImage from "../assets/feu.webp";
import SecuriseImage from "../assets/securise.webp";
import SoinDesPiedsImage from "../assets/soin des pieds.webp";
import VisageSoinImage from "../assets/visage soign.webp";

const RestaurantCard = () => {
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Steak Frites",
      description: "Steak juteux accompagné de frites croustillantes.",
      price: 18,
      ingredients: ["Steak", "Frites", "Beurre", "Herbes"],
      image: SteakFritesImage,
      ideas: [
        "Accompagnez ce plat avec une sauce béarnaise.",
        "Essayez une bière blonde pour un accord parfait.",
        "Ajoutez une salade verte pour plus de fraîcheur.",
      ],
    },
    {
      id: 2,
      name: "Pâtes Carbonara",
      description: "Pâtes crémeuses avec lardons et parmesan.",
      price: 14,
      ingredients: ["Pâtes", "Lardons", "Crème", "Parmesan"],
      image: PatesCarbonaraImage,
      ideas: [
        "Servez ce plat avec un verre de vin blanc sec.",
        "Ajoutez un peu de poivre noir pour rehausser le goût.",
        "Essayez une salade César en entrée.",
      ],
    },
    {
      id: 3,
      name: "Salade César",
      description: "Salade fraîche avec poulet grillé, croûtons et sauce césar.",
      price: 12,
      ingredients: ["Laitue", "Poulet", "Croûtons", "Sauce César"],
      image: SaladeCesarImage,
      ideas: [
        "Ajoutez des tranches d'avocat pour plus de crémeux.",
        "Accompagnez d'un vin rosé frais.",
        "Parsemez de parmesan fraîchement râpé avant de servir.",
      ],
    },
    {
      id: 4,
      name: "Burger Gourmet",
      description: "Burger avec steak haché, cheddar, bacon et sauce maison.",
      price: 16,
      ingredients: ["Steak haché", "Cheddar", "Bacon", "Sauce maison"],
      image: BurgerGourmetImage,
      ideas: [
        "Servez avec des oignons caramélisés.",
        "Accompagnez d'une bière IPA.",
        "Ajoutez des cornichons pour une touche acidulée.",
      ],
    },
    {
      id: 5,
      name: "Pizza Margherita",
      description: "Pizza classique avec tomate, mozzarella et basilic.",
      price: 13,
      ingredients: ["Tomate", "Mozzarella", "Basilic"],
      image: PizzaMargheritaImage,
      ideas: [
        "Ajoutez un filet d'huile d'olive après cuisson.",
        "Accompagnez d'un vin rouge léger.",
        "Parsemez de flocons de piment pour un peu de piquant.",
      ],
    },
    {
      id: 6,
      name: "Sushi Mix",
      description: "Assortiment de sushis frais (saumon, thon, crevette).",
      price: 22,
      ingredients: ["Riz", "Saumon", "Thon", "Crevette"],
      image: SushiMixImage,
      ideas: [
        "Servez avec du wasabi et du gingembre mariné.",
        "Accompagnez de saké frais.",
        "Présentez sur une planche en bambou pour une touche authentique.",
      ],
    },
    {
      id: 7,
      name: "Tiramisu",
      description: "Dessert italien au café et mascarpone.",
      price: 8,
      ingredients: ["Mascarpone", "Café", "Biscuits", "Cacao"],
      image: TiramisuImage,
      ideas: [
        "Saupoudrez de cacao amer juste avant de servir.",
        "Accompagnez d'un vin doux comme un Marsala.",
        "Servez dans des verrines individuelles pour une présentation élégante.",
      ],
    },
    {
      id: 8,
      name: "Crème Brûlée",
      description: "Crème onctueuse avec une couche de sucre caramélisé.",
      price: 9,
      ingredients: ["Crème", "Sucre", "Vanille"],
      image: CremeBruleeImage,
      ideas: [
        "Utilisez une torche pour caraméliser le sucre à table.",
        "Accompagnez d'un thé earl grey.",
        "Ajoutez des zestes d'agrumes pour une touche fraîche.",
      ],
    },
  ]);

  

  const [selectedDish, setSelectedDish] = useState(null);
  const [showAddDishForm, setShowAddDishForm] = useState(false);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: 0,
    ingredients: [],
    image: null,
    ideas: [],
  });

  const closeModal = () => {
    setSelectedDish(null);
  };

  const handleAddDish = () => {
    setShowAddDishForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({
      ...newDish,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewDish({
      ...newDish,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleIngredientsChange = (e) => {
    setNewDish({
      ...newDish,
      ingredients: e.target.value.split(","),
    });
  };

  const handleIdeasChange = (e) => {
    setNewDish({
      ...newDish,
      ideas: e.target.value.split(","),
    });
  };

  const submitNewDish = () => {
    const dishToAdd = {
      id: menu.length + 1,
      name: newDish.name,
      description: newDish.description,
      price: parseFloat(newDish.price),
      ingredients: newDish.ingredients,
      image: newDish.image,
      ideas: newDish.ideas,
    };
    setMenu([...menu, dishToAdd]);
    setShowAddDishForm(false);
    setNewDish({
      name: "",
      description: "",
      price: 0,
      ingredients: [],
      image: null,
      ideas: [],
    });
  };

  // Fonction pour supprimer un plat
  const handleDelete = (dishId) => {
    const updatedMenu = menu.filter((dish) => dish.id !== dishId);
    setMenu(updatedMenu);
    alert("Plat supprimé avec succès !");
  };

  return (
    <div className="restaurant-card-container">
      <button className="add-dish-button" onClick={handleAddDish}>
        Ajouter un plat
      </button>
      {showAddDishForm && (
        <div className="add-dish-form">
          <h3>Ajouter un nouveau plat</h3>
          <input
            type="text"
            name="name"
            placeholder="Nom du plat"
            value={newDish.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newDish.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={newDish.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Ingrédients (séparés par des virgules)"
            value={newDish.ingredients.join(",")}
            onChange={handleIngredientsChange}
          />
          <input
            type="text"
            name="ideas"
            placeholder="Idées/Suggestions (séparées par des virgules)"
            value={newDish.ideas.join(",")}
            onChange={handleIdeasChange}
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          <button onClick={submitNewDish}>Ajouter</button>
          <button onClick={() => setShowAddDishForm(false)}>Annuler</button>
        </div>
      )}
      <div className="menu-grid">
        {menu.map((dish) => (
          <div key={dish.id} className="card">
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p><strong>Prix :</strong> {dish.price}€</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(dish.id)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      {selectedDish && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className="dish-image"
            />
            <h3>{selectedDish.name}</h3>
            <p>{selectedDish.description}</p>
            <p><strong>Prix :</strong> {selectedDish.price}€</p>
            <p><strong>Ingrédients :</strong> {selectedDish.ingredients.join(", ")}</p>
            <h4>Idées/Suggestions :</h4>
            <ul>
              {selectedDish.ideas.map((idea, index) => (
                <li key={index}>{idea}</li>
              ))}
            </ul>
            <button className="close-modal" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const GymServices = () => {
  const gymServices = [
    {
      id: 1,
      name: "Cardio Training",
      price: "30€",
      hours: "6h - 22h",
      team: "Équipe Fitness",
      description: "Séances de cardio pour améliorer votre endurance.",
      image: GymImage,
    },
    {
      id: 2,
      name: "Musculation",
      price: "40€",
      hours: "7h - 21h",
      team: "Équipe Bodybuilding",
      description: "Exercices de musculation pour renforcer vos muscles.",
      image: MusculationImage,
    },
    {
      id: 3,
      name: "Yoga",
      price: "35€",
      hours: "8h - 20h",
      team: "Équipe Relaxation",
      description: "Séances de yoga pour améliorer votre flexibilité et votre bien-être.",
      image: MassageImage,
    },
  ];
  const [selectedService, setSelectedService] = useState(null);
  const closeModal = () => {
    setSelectedService(null);
  };
  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };
  return (
    <div>
      <div className="gym-services-container">
        {gymServices.map((service) => (
          <div
            key={service.id}
            className="gym-card"
          >
            <img
              src={service.image}
              alt={service.name}
              className="gym-card-image"
            />
            <h3>{service.name}</h3>
            <p>Prix : {service.price}</p>
            <p>Heures : {service.hours}</p>
            <p>Équipe : {service.team}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpaEmergencyService = () => {
  const spaServices = [
    {
      id: 1,
      name: "Massage",
      price: "70€",
      hours: "10h - 20h",
      team: "Équipe Bien-être",
      description: "Massage relaxant pour détendre vos muscles.",
      image: MassageImage,
    },
    {
      id: 2,
      name: "Soins du Visage",
      price: "50€",
      hours: "9h - 18h",
      team: "Équipe Beauté",
      description: "Soins hydratants et anti-âge pour votre visage.",
      image: VisageSoinImage,
    },
    {
      id: 3,
      name: "Soins des Pieds",
      price: "40€",
      hours: "11h - 19h",
      team: "Équipe Podologie",
      description: "Pédicure et soins des pieds pour un confort optimal.",
      image: SoinDesPiedsImage,
    },
  ];
  const [selectedService, setSelectedService] = useState(null);
  const closeModal = () => {
    setSelectedService(null);
  };
  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };
  return (
    <div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {spaServices.map((service) => (
          <div
            key={service.id}
            className="spa-card"
          >
            <div className="icon"></div>
            <img
              src={service.image}
              alt={service.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{service.name}</h3>
            <p>Prix : {service.price}</p>
            <p>Heures : {service.hours}</p>
            <p>Équipe : {service.team}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmergencyService = () => {
  const emergencyServices = [
    {
      id: 1,
      name: "Appeler un Docteur",
      description: "Contactez un médecin en cas d'urgence médicale.",
      image: DoctorImage,
    },
    {
      id: 2,
      name: "Signaler un Feu",
      description: "Signalez un incendie dans votre chambre ou ailleurs.",
      image: FeuImage,
    },
    {
      id: 3,
      name: "Appeler la Sécurité",
      description: "Contactez la sécurité en cas de problème.",
      image: SecuriseImage,
    },
  ];
  const [selectedService, setSelectedService] = useState(null);
  const closeModal = () => {
    setSelectedService(null);
  };
  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };
  return (
    <div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {emergencyServices.map((service) => (
          <div
            key={service.id}
            className="emergency-card"
          >
            <div className="icon"></div>
            <img
              src={service.image}
              alt={service.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="service-details-page">
      {serviceId === "1" && <RestaurantCard />}
      {serviceId === "2" && <GymServices />}
      {serviceId === "3" && <SpaEmergencyService />}
      {serviceId === "4" && <EmergencyService />}
      <button
        className="back-button"
        onClick={() => navigate("/employee/services")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#3498db",
          color: "#fff",
        }}
      >
        Retour aux Services Additionnels
      </button>
    </div>
  );
};

export default ServiceDetailsPage;