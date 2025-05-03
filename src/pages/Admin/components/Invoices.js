// components/Invoices.js
import React from 'react';
import'../styles//Invoices.css';
const invoices = [
  {
    id: 1,
    clientName: 'John Doe',
    amount: 150.00,
    date: '2025-04-28',
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    amount: 200.00,
    date: '2025-04-27',
  },
  {
    id: 3,
    clientName: 'Alice Johnson',
    amount: 100.00,
    date: '2025-04-26',
  }, {
    id: 4,
    clientName: 'Michael Chen',
    amount: 275.00,
    date: '2025-04-25',
    paymentMethod: 'Credit Card'
  },
  {
    id: 5,
    clientName: 'Emma Wilson',
    amount: 180.00,
    date: '2025-04-24',
    paymentMethod: 'PayPal'
  },
  {
    id: 6,
    clientName: 'Lucas Brown',
    amount: 320.00,
    date: '2025-04-23',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 7,
    clientName: 'Olivia Davis',
    amount: 140.00,
    date: '2025-04-22',
    paymentMethod: 'Credit Card'
  },
  {
    id: 8,
    clientName: 'Liam Garcia',
    amount: 210.00,
    date: '2025-04-21',
    paymentMethod: 'PayPal'
  },
  {
    id: 9,
    clientName: 'Sophia Martinez',
    amount: 190.00,
    date: '2025-04-20',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 10,
    clientName: 'Noah Taylor',
    amount: 260.00,
    date: '2025-04-19',
    paymentMethod: 'Credit Card'
  }
];

const Invoices = () => {
  return (
    <div className="invoices-container">
      <h1 className="invoices-title">Factures</h1>
      <table className="invoices-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.clientName}</td>
              <td>${invoice.amount.toFixed(2)}</td>
              <td>{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;