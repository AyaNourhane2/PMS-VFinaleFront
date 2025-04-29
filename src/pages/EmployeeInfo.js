import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Données des rôles
const rolesData = {
  receptioniste: {
    title: "Réceptionniste",
    description: "Le réceptionniste est responsable de l'accueil des clients et de la gestion des appels téléphoniques.",
    monthlyPayment: "2000 €",
    permissions: "Accès aux systèmes de réservation et de gestion des clients.",
    holidayDays: "25 jours par an",
    restTime: "1 heure de pause par jour",
    color: "#FF6F61", // Couleur corail
  },
  "femmes-de-menage": {
    title: "Femmes de ménage",
    description: "Les femmes de ménage assurent le nettoyage et l'entretien des espaces de travail.",
    monthlyPayment: "1800 €",
    permissions: "Accès aux zones de nettoyage et aux fournitures.",
    holidayDays: "20 jours par an",
    restTime: "30 minutes de pause par jour",
    color: "#88B04B", // Couleur verte
  },
  "service-compatible": {
    title: "Service Compatible",
    description: "Le service compatible gère les relations avec les clients et résout les problèmes techniques.",
    monthlyPayment: "2500 €",
    permissions: "Accès aux systèmes de support client et de gestion des tickets.",
    holidayDays: "22 jours par an",
    restTime: "1 heure de pause par jour",
    color: "#FFA500", // Couleur orange
  },
  "responsable-services-additionnels": {
    title: "Responsable des Services Additionnels",
    description: "Le responsable des services additionnels supervise les services supplémentaires offerts aux clients.",
    monthlyPayment: "3000 €",
    permissions: "Accès aux systèmes de gestion des services additionnels.",
    holidayDays: "28 jours par an",
    restTime: "1 heure de pause par jour",
    color: "#92A8D1", // Couleur bleue
  },
};

// Styles en ligne
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  roleButton: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#6B5B95',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
  },
  roleButtonHover: {
    backgroundColor: '#524a6b',
  },
  roleButtonClick: {
    transform: 'scale(0.95)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  roleTitle: {
    fontStyle: 'italic',
    textDecoration: 'underline',
    fontSize: '1.5rem',
    color: '#6B5B95',
  },
  roleDescription: {
    fontStyle: 'italic',
    color: '#555',
  },
  detailItem: {
    marginBottom: '15px',
  },
  detailLabel: {
    fontStyle: 'italic',
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: '#6B5B95',
  },
  detailValue: {
    color: '#333',
  },
  formContainer: {
    marginTop: '20px',
    padding: '20px 40px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formInput: {
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
  },
  formInputFocus: {
    backgroundColor: '#f0f0f0',
    borderColor: '#6B5B95',
    boxShadow: '0 0 5px rgba(107, 91, 149, 0.5)',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#6B5B95',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#524a6b',
  },
  submitButtonClick: {
    transform: 'scale(0.95)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  card: {
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    animation: 'fadeIn 0.5s ease-in-out',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
  },
  cardClick: {
    transform: 'scale(0.98)',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
};

const EmployeeInfo = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState(false);
  const navigate = useNavigate();

  const handleRoleClick = (roleKey) => {
    setSelectedRole(roleKey);
    setShowForm(false);
    setIsButtonClicked(true);
    setTimeout(() => setIsButtonClicked(false), 200); // Reset après l'animation
  };

  const handleApplyClick = () => {
    setShowForm(true);
    setIsCardClicked(true);
    setTimeout(() => setIsCardClicked(false), 200); // Reset après l'animation
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.success('Formulaire soumis avec succès !', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleInputFocus = (e) => {
    e.target.style.backgroundColor = styles.formInputFocus.backgroundColor;
    e.target.style.borderColor = styles.formInputFocus.borderColor;
    e.target.style.boxShadow = styles.formInputFocus.boxShadow;
  };

  const handleInputBlur = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.borderColor = '#ccc';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.roleTitle}>Informations des Employés</h1>

      {/* Boutons pour sélectionner un rôle */}
      <div>
        {Object.keys(rolesData).map((roleKey) => (
          <button
            key={roleKey}
            onClick={() => handleRoleClick(roleKey)}
            style={{
              ...styles.roleButton,
              backgroundColor: rolesData[roleKey].color,
              ...(isButtonClicked && styles.roleButtonClick),
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#524a6b')}
            onMouseOut={(e) => (e.target.style.backgroundColor = rolesData[roleKey].color)}
          >
            {rolesData[roleKey].title}
          </button>
        ))}
      </div>

      {/* Afficher les détails du rôle sélectionné dans une carte */}
      {selectedRole && (
        <div
          style={{
            ...styles.card,
            ...(isCardClicked && styles.cardClick),
          }}
        >
          <h2 style={styles.roleTitle}>{rolesData[selectedRole].title}</h2>
          <p style={styles.roleDescription}>{rolesData[selectedRole].description}</p>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Paiement mensuel:</span>
            <span style={styles.detailValue}>{rolesData[selectedRole].monthlyPayment}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Permissions:</span>
            <span style={styles.detailValue}>{rolesData[selectedRole].permissions}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Jours de congé:</span>
            <span style={styles.detailValue}>{rolesData[selectedRole].holidayDays}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Temps de repos:</span>
            <span style={styles.detailValue}>{rolesData[selectedRole].restTime}</span>
          </div>

          {/* Bouton pour demander le travail */}
          <button
            onClick={handleApplyClick}
            style={{
              ...styles.roleButton,
              backgroundColor: rolesData[selectedRole].color,
            }}
          >
            Demander le travail
          </button>
        </div>
      )}

      {/* Formulaire de candidature */}
      {showForm && (
        <div style={styles.formContainer}>
          <h2 style={styles.roleTitle}>Formulaire de Candidature</h2>
          <form onSubmit={handleFormSubmit}>
            <label style={styles.detailLabel}>Nom:</label>
            <input
              type="text"
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <label style={styles.detailLabel}>Prénom:</label>
            <input
              type="text"
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <label style={styles.detailLabel}>Adresse:</label>
            <input
              type="text"
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <label style={styles.detailLabel}>Âge:</label>
            <input
              type="number"
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <label style={styles.detailLabel}>Téléphone:</label>
            <input
              type="tel"
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <label style={styles.detailLabel}>Email:</label>
            <input
              type="email"
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <label style={styles.detailLabel}>Genre:</label>
            <select
              required
              style={styles.formInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            >
              <option value="">Sélectionnez</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>

            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(isButtonClicked && styles.submitButtonClick),
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
            >
              Soumettre
            </button>
          </form>
        </div>
      )}

      {/* Toast pour afficher le message de succès */}
      <ToastContainer />
    </div>
  );
};

export default EmployeeInfo;