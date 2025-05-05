import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import "../Style/LoginModal.css";

const LoginModal = ({ rolePath, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Gérer la disparition du message de succès après 3 secondes
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
        navigate(rolePath); // Redirection après la disparition du message
      }, 3000); // 3 secondes
      return () => clearTimeout(timer); // Nettoyage du timer
    }
  }, [success, navigate, rolePath]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setSuccess('');
      return;
    }

    // Vérification des emails spécifiques avec un nom quelconque
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer un email valide');
      setSuccess('');
      return;
    }

    if (rolePath === '/employee/receptionist' && !email.endsWith('Recep@gmail.com')) {
      setError('Email incorrect pour le rôle de réceptionniste. Utilisez un email se terminant par Recep@gmail.com');
      setSuccess('');
      return;
    }

    if (rolePath === '/employee/housekeeping' && !email.endsWith('FemmeMen@gmail.com')) {
      setError('Email incorrect pour le rôle de femme de ménage. Utilisez un email se terminant par FemmeMen@gmail.com');
      setSuccess('');
      return;
    }

    if (rolePath === '/employee/accounting' && !email.endsWith('Compatible@gmail.com')) {
      setError('Email incorrect pour le rôle de comptable. Utilisez un email se terminant par Compatible@gmail.com');
      setSuccess('');
      return;
    }

    // Simulation de connexion réussie
    setError('');
    setSuccess('Connexion réussie ! Redirection en cours...');
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label><FaEnvelope className="input-icon" /> Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div className="form-group">
            <label><FaLock className="input-icon" /> Mot de passe:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button type="submit" className="login-button">
            <FaSignInAlt className="button-icon" /> Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;