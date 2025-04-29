import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Mode sombre
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer les données de l'utilisateur lorsque l'emplacement change
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 200);

    // Appliquer le mode sombre au chargement initial
    const isDarkModeSaved = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(isDarkModeSaved);
    if (isDarkModeSaved) {
      document.body.classList.add('dark-mode');
    }
  }, [location]);

  // Fonction pour récupérer les données de l'utilisateur depuis le sessionStorage
  const getData = async () => {
    const data = await JSON.parse(sessionStorage.getItem('userData'));
    if (data && data.isLoggedIn) {
      setUserData(data.userData);
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    sessionStorage.clear();
    setUserData(null);
    navigate('/');
  };

  // Fonction pour activer/désactiver le mode sombre
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', !isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Fonction pour réduire la barre d'en-tête lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={require('../asset/Hotel logo.webp')} alt="Hotel Logo" />
            <span>RoyelStay</span>
          </Link>
        </div>

        {/* Menu de navigation */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            {/* Accueil */}
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
              >
                <i className="fas fa-home"></i>
                <span>Accueil</span>
              </Link>
            </li>

             
              <>
                {/* Connexion */}
                <li>
                  <Link
                    to="/login"
                    className={location.pathname === '/login' ? 'active' : ''}
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Se connecter</span>
                  </Link>
                </li>
                {/* Inscription */}
                <li>
                  <Link
                    to="/signup"
                    className={location.pathname === '/signup' ? 'active' : ''}
                  >
                    <i className="fas fa-user-plus"></i>
                    <span>S'inscrire</span>
                  </Link>
                </li>
                <li>
             
            </li>
              </>
            

            {/* Bouton Mode Sombre */}
            <li>
              <button
                className="dark-mode-toggle"
                onClick={toggleDarkMode}
                title="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <i className="fas fa-sun"></i>
                ) : (
                  <i className="fas fa-moon"></i>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Bouton de menu mobile */}
        <div
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </header>
  );
};

export default Header;