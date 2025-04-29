import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ buttons, onButtonClick, activeButton, onLogout, dashboardName, profileImage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "◄" : "►"}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="profile-section">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <h1>{dashboardName}</h1>
        </div>
        <nav>
          <ul>
            {buttons.map((button, index) => (
              <li
                key={index}
                className={button.name === activeButton ? "active" : ""}
                onClick={() => onButtonClick(button.name)}
              >
                <span className="icon">{button.icon}</span>
                <span className="title">{button.name}</span>
              </li>
            ))}
            <li onClick={onLogout}>
              <span className="icon"><FaSignOutAlt /></span>
              <span className="title">Déconnexion</span>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;