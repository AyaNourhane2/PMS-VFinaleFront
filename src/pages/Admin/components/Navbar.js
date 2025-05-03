import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import {
  FaTachometerAlt, FaBed, FaCalendarAlt, FaUsers, FaEnvelope,
  FaConciergeBell, FaMoneyBillWave, FaFileInvoiceDollar, FaFileInvoice,
  FaTasks, FaShoppingCart, FaWarehouse, FaUserCheck, FaCog, FaSignOutAlt,
  FaChevronRight, FaChevronLeft
} from 'react-icons/fa';
import { RiHotelLine } from 'react-icons/ri';

function Navbar({ adminName }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Tableau de bord', tab: 'dashboard' },
    { icon: <FaBed />, label: 'Chambres', tab: 'room-management' },
    { icon: <FaCalendarAlt />, label: 'Réservations', tab: 'reservations' },
    { icon: <FaUsers />, label: 'Clients', tab: 'users' },
    { icon: <FaEnvelope />, label: 'Messages', tab: 'messages' },
    { icon: <FaConciergeBell />, label: 'Services', tab: 'services' },
    { icon: <FaMoneyBillWave />, label: 'Paiements', tab: 'payments' },
    { icon: <FaFileInvoiceDollar />, label: 'Factures', tab: 'invoices' },
    { icon: <FaFileInvoice />, label: 'Taxes', tab: 'taxes' },
    { icon: <FaWarehouse />, label: 'Stocks & Commandes', tab: 'cleaning' },
    { icon: <FaTasks />, label: 'Tâches & Demandes', tab: 'cleaning-tasks' },
    { icon: <FaUserCheck />, label: 'Suivi Personnel', tab: 'staff-tracking' },
    { icon: <FaCog />, label: 'Paramètres', tab: 'settings' },
  ];

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  const handleTabClick = (tab) => {
    navigate(`/admin/${tab}`);
  };

  const isActiveTab = (tab) => location.pathname.includes(`/admin/${tab}`);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <nav className={`admin-navbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="navbar-header">
        <div className="logo-container" onClick={() => navigate('/admin/dashboard')}>
          <RiHotelLine className="logo-icon" />
          {!isCollapsed && (
            <div className="logo-text-container">
              <span className="logo-text">RoyelStay</span>
              <span className="logo-subtext">Admin Panel</span>
            </div>
          )}
        </div>

        <button className="toggle-button" onClick={toggleNavbar} aria-label="Toggle sidebar">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div className="nav-divider"></div>

      <div className="nav-profile">
        <div className="profile-avatar">
          {adminName?.charAt(0).toUpperCase() || 'A'}
        </div>
        {!isCollapsed && (
          <div className="profile-info">
            <span className="profile-name">{adminName || 'Administrateur'}</span>
            <span className="profile-role">Admin</span>
          </div>
        )}
      </div>

      <div className="nav-buttons">
        {navItems.map((item) => (
          <button
            key={item.tab}
            className={`nav-button ${isActiveTab(item.tab) ? 'active' : ''}`}
            onClick={() => handleTabClick(item.tab)}
            aria-label={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {isActiveTab(item.tab) && !isCollapsed && (
              <span className="active-indicator"></span>
            )}
          </button>
        ))}
      </div>

      <div className="nav-footer">
        <button className="logout-button" onClick={handleLogout} aria-label="Déconnexion">
          <FaSignOutAlt className="logout-icon" />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;