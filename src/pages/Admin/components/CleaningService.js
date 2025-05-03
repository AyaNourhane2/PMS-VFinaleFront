import React, { useState } from 'react';
import { FaTshirt, FaBell, FaFilter, FaArrowLeft, FaArrowRight, FaHistory, FaBoxOpen } from 'react-icons/fa';
import '../styles/CleaningService.css';

function CleaningService() {
  // État pour les stocks
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Serviettes', quantity: 50, needsRestock: false, category: 'Textile', minQuantity: 30 },
    { id: 2, item: 'Détergent', quantity: 10, needsRestock: true, category: 'Produits nettoyage', minQuantity: 15 },
    { id: 3, item: 'Gants jetables', quantity: 20, needsRestock: true, category: 'Protection', minQuantity: 50 },
    { id: 4, item: 'Sac poubelle', quantity: 100, needsRestock: false, category: 'Fournitures', minQuantity: 200 },
    { id: 5, item: 'Shampoing moquette', quantity: 5, needsRestock: true, category: 'Produits nettoyage', minQuantity: 10 },
    { id: 6, item: 'Désinfectant', quantity: 8, needsRestock: true, category: 'Produits nettoyage', minQuantity: 20 },
    { id: 7, item: 'Eponges', quantity: 25, needsRestock: false, category: 'Outils', minQuantity: 40 },
    { id: 8, item: 'Balai', quantity: 15, needsRestock: false, category: 'Outils', minQuantity: 10 },
    { id: 9, item: 'Serpillère', quantity: 12, needsRestock: false, category: 'Outils', minQuantity: 10 },
    { id: 10, item: 'Savon mains', quantity: 30, needsRestock: false, category: 'Hygiène', minQuantity: 50 },
  ]);
  
  // État pour les notifications
  const [notifications, setNotifications] = useState([]);
  
  // État pour l'historique des actions
  const [history, setHistory] = useState([]);
  
  // État pour le filtrage des stocks
  const [inventoryFilter, setInventoryFilter] = useState('all');
  
  // Pagination pour l'inventaire
  const [currentInventoryPage, setCurrentInventoryPage] = useState(1);
  const inventoryPerPage = 6;

  // État pour les commandes
  const [orders, setOrders] = useState([
    { id: 1, product: 'Détergent', quantity: 15, date: '2023-05-15', status: 'Livré' },
    { id: 2, product: 'Gants jetables', quantity: 50, date: '2023-05-18', status: 'En cours' },
    { id: 3, product: 'Shampoing moquette', quantity: 10, date: '2023-05-20', status: 'Livré' },
  ]);

  // Fonction pour mettre à jour les stocks
  const updateInventory = (itemId, newQuantity) => {
    const updatedInventory = inventory.map(item =>
      item.id === itemId ? { 
        ...item, 
        quantity: newQuantity,
        needsRestock: newQuantity <= item.minQuantity
      } : item
    );
    
    setInventory(updatedInventory);
    
    const item = inventory.find(i => i.id === itemId);
    setNotifications([...notifications, `Réapprovisionnement de ${item.item} à ${newQuantity} unités`]);
    setHistory([...history, `Stock mis à jour : ${item.item} (${newQuantity} unités)`]);
  };

  // Fonction pour commander un produit
  const orderProduct = (itemId, quantityToAdd) => {
    const item = inventory.find(i => i.id === itemId);
    const newQuantity = item.quantity + quantityToAdd;
    updateInventory(itemId, newQuantity);

    // Ajouter la commande à l'historique des commandes
    const newOrder = {
      id: orders.length + 1,
      product: item.item,
      quantity: quantityToAdd,
      date: new Date().toISOString().split('T')[0],
      status: 'En cours'
    };
    setOrders([...orders, newOrder]);
  };

  // Filtrer les produits en fonction de la catégorie
  const filteredInventory = inventory.filter(item => {
    if (inventoryFilter === 'all') return true;
    if (inventoryFilter === 'needsRestock') return item.needsRestock;
    return item.category === inventoryFilter;
  });

  // Pagination pour l'inventaire
  const indexOfLastInventory = currentInventoryPage * inventoryPerPage;
  const indexOfFirstInventory = indexOfLastInventory - inventoryPerPage;
  const currentInventory = filteredInventory.slice(indexOfFirstInventory, indexOfLastInventory);
  const totalInventoryPages = Math.ceil(filteredInventory.length / inventoryPerPage);

  const paginate = (pageNumber) => {
    setCurrentInventoryPage(pageNumber);
  };

  // Catégories uniques pour le filtre
  const categories = [...new Set(inventory.map(item => item.category))];

  return (
    <div className="hotel-cleaning-management">
      <h1>Gestion de stocks</h1>

      {/* Notifications */}
      <section className="notification-section">
        <h2><FaBell /> Notifications</h2>
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="notification-card">
                <p>{notification}</p>
              </div>
            ))
          ) : (
            <p>Aucune notification pour le moment.</p>
          )}
        </div>
      </section>

      {/* Gestion des Stocks */}
      <section className="inventory-section">
        <h2><FaTshirt /> Les Produits</h2>
        
        <div className="inventory-controls">
          <div className="filter-bar">
            <FaFilter />
            <select value={inventoryFilter} onChange={(e) => setInventoryFilter(e.target.value)}>
              <option value="all">Tous les produits</option>
              <option value="needsRestock">À réapprovisionner</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="inventory-list">
          {currentInventory.map((item) => (
            <div key={item.id} className={`inventory-card ${item.needsRestock ? 'needs-restock' : ''}`}>
              <h3>{item.item}</h3>
              <p>Catégorie: {item.category}</p>
              <p>Quantité: {item.quantity} / Min: {item.minQuantity}</p>
              <div className="inventory-actions">
                <button 
                  className="restock-button small"
                  onClick={() => orderProduct(item.id, 5)}
                >
                  +5 unités
                </button>
                <button 
                  className="restock-button small"
                  onClick={() => orderProduct(item.id, 10)}
                >
                  +10 unités
                </button>
                <button 
                  className="restock-button small"
                  onClick={() => orderProduct(item.id, item.minQuantity)}
                >
                  Réappro. min
                </button>
              </div>
              {item.needsRestock && (
                <div className="restock-alert">
                  <FaBell /> Réapprovisionnement nécessaire
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="pagination">
          <button
            onClick={() => paginate(currentInventoryPage - 1)}
            disabled={currentInventoryPage === 1}
          >
            <FaArrowLeft />
          </button>
          <span>Page {currentInventoryPage} / {totalInventoryPages}</span>
          <button
            onClick={() => paginate(currentInventoryPage + 1)}
            disabled={indexOfLastInventory >= filteredInventory.length}
          >
            <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Commandes passées */}
      <section className="orders-section">
        <h2><FaBoxOpen /> Commandes passées</h2>
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Date</th>
                
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className={`order-row ${order.status.toLowerCase().replace(' ', '-')}`}>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.date}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Historique des Actions */}
      <section className="history-section">
        <h2><FaHistory /> Historique des Actions</h2>
        <div className="history-list">
          {history.length > 0 ? (
            history.map((action, index) => (
              <div key={index} className="history-card">
                <p>{action}</p>
              </div>
            ))
          ) : (
            <p>Aucune action enregistrée pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CleaningService;