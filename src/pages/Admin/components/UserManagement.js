import React, { useState, useEffect } from 'react';
import '../styles/UserManagement.css';
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaEdit, FaTrash, FaUserPlus, FaMoon, FaSun } from 'react-icons/fa';
import img from '../assets/img.webp';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);

  // Récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usersmanag');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showNotification(err.message, true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!newUser.username || !newUser.role) {
      showNotification("Veuillez remplir tous les champs.", true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/usersmanag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
      }

      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ username: '', email: '', role: 'user' });
      showNotification("Utilisateur ajouté avec succès !");
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const updateUser = async (id) => {
    const updatedUsername = prompt("Nouveau nom d'utilisateur");
    const updatedEmail = prompt("Nouvel email");
    const updatedRole = prompt("Nouveau rôle");

    if (updatedUsername && updatedRole) {
      try {
        const response = await fetch(`http://localhost:3000/api/usersmanag/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: updatedUsername,
            email: updatedEmail,
            role: updatedRole
          }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la modification de l\'utilisateur');
        }

        const updatedUser = await response.json();
        setUsers(users.map(user => user.id === id ? updatedUser : user));
        showNotification("Utilisateur modifié avec succès !");
      } catch (err) {
        showNotification(err.message, true);
      }
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/usersmanag/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }

      setUsers(users.filter(user => user.id !== id));
      showNotification("Utilisateur supprimé avec succès !");
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Filtrer et trier les utilisateurs
  const filteredUsers = users
    .filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Bouton pour basculer en mode sombre */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.isError ? 'error' : 'success'}`}>
          {notification.message}
        </div>
      )}

      <div className="user-management">
        {/* En-tête avec image */}
        <div className="header-with-image">
          <img src={img} alt="Gestion des utilisateurs" className="header-image" />
          <h2 className="title">Gestion des Utilisateurs</h2>
        </div>

        {/* Barre de recherche */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Bouton de tri */}
        <button onClick={toggleSortOrder} className="sort-button">
          {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          Trier par nom ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>

        {/* Formulaire d'ajout d'utilisateur */}
        <div className="user-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="user-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="user-input"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="user-input"
          >
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          <button onClick={addUser} className="add-user-button">
            <FaUserPlus /> Ajouter
          </button>
        </div>

        {/* Liste des utilisateurs */}
        <ul className="user-list">
          {currentUsers.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.username}</span>
              <span className="user-email">{user.email}</span>
              <span className="user-role">{user.role}</span>
              <div className="user-actions">
                <button onClick={() => updateUser(user.id)} className="edit-button">
                  <FaEdit /> Modifier
                </button>
                <button onClick={() => deleteUser(user.id)} className="delete-button">
                  <FaTrash /> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;