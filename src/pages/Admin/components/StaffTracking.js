// components/StaffTracking.js
import React from 'react';
import '../styles/StaffTracking.css'; // Vous pouvez créer ce fichier pour ajouter des styles

const StaffTracking = () => {
  // Données de démonstration pour le tableau
  const staff = [
    { id: 1, name: 'Jean Dupont', status: 'Présent', performance: '8' },
    { id: 2, name: 'Marie Curie', status: 'absent', performance: '1' },
    { id: 3, name: 'Pierre Durand', status: 'Absent', performance: '4' },
    { id: 4, name: 'Lucie Martin', status: 'Présent', performance: '9' },
    { id: 5, name: 'François Lefèvre', status: 'Présent', performance: '3' },
    // Ajoutez plus de données ici
  ];

  return (
    <div className="staff-tracking-container">
      <h1 className="staff-tracking-title">Suivi du Personnel</h1>
      <table className="staff-tracking-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Statut</th>
            <th>Performance</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.status}</td>
              <td>{employee.performance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTracking;