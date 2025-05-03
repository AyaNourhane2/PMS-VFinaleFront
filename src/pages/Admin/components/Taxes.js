// components/Taxes.js
import React from 'react';
import '../styles/Taxes.css'; // Importez le fichier CSS

const Taxes = () => {
  // Données de démonstration pour le tableau
  const taxesData = [
    { type: 'TVA', montant: 120.50, date: '2025-04-25' },
    { type: 'Taxe de séjour', montant: 30.00, date: '2025-04-24' },
    { type: 'TVA', montant: 200.00, date: '2025-04-23' },
    { type: 'Taxe de séjour', montant: 50.00, date: '2025-04-22' },
    { type: 'TVA', montant: 150.75, date: '2025-04-21' },
    { type: 'Taxe de séjour', montant: 40.25, date: '2025-04-20' },
    { type: 'TVA', montant: 180.00, date: '2025-04-19' },
    { type: 'Taxe de séjour', montant: 60.00, date: '2025-04-18' },
    { type: 'TVA', montant: 130.50, date: '2025-04-17' },
    { type: 'Taxe de séjour', montant: 25.00, date: '2025-04-16' },
    // Ajoutez plus de données ici
  ];

  return (
    <div className="taxes-container">
      <h1 className="taxes-title">Taxes</h1>
      <table className="taxes-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Montant</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {taxesData.map((tax, index) => (
            <tr key={index}>
              <td>{tax.type}</td>
              <td>{tax.montant.toFixed(2)} €</td>
              <td>{tax.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Taxes;