import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./sidebar.css"; // Assurez-vous d'avoir ce fichier CSS

const Sidebar = ({ 
  buttons = [], 
  onButtonClick = () => {}, 
  activeButton = "", 
  onLogout = () => {}, 
  dashboardName = "Dashboard", 
  profileImage = "../assets/profilereceptioniste.webp" 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "◄" : "►"}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="profile-section">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
          {isOpen && <h1 className="dashboard-title">{dashboardName}</h1>}
        </div>

        <nav className="navigation">
          <ul className="menu-list">
            {buttons.map((button, index) => (
              <li
                key={`${button.name}-${index}`}
                className={`menu-item ${button.name === activeButton ? "active" : ""}`}
                onClick={() => onButtonClick(button.name)}
              >
                <span className="item-icon">{button.icon}</span>
                {isOpen && <span className="item-text">{button.name}</span>}
              </li>
            ))}
            
            <li className="menu-item logout-item" onClick={onLogout}>
              <span className="item-icon"><FaSignOutAlt /></span>
              {isOpen && <span className="item-text">Déconnexion</span>}
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;