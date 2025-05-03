import React from 'react';
import '../styles/Payments.css';

const Payments = () => {
  // Données de paiement avec plusieurs nouveaux clients
  const payments = [
    {
      id: 1,
      clientName: 'John Doe',
      amount: 150.00,
      date: '2025-04-28',
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      amount: 200.00,
      date: '2025-04-27',
      paymentMethod: 'PayPal'
    },
    {
      id: 3,
      clientName: 'Alice Johnson',
      amount: 100.00,
      date: '2025-04-26',
      paymentMethod: 'Bank Transfer'
    },
    {
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

  return (
    <div className="payments-container">
      <h1 className="payments-title">Payments</h1>
      <table className="payments-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.clientName}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.date}</td>
              <td>{payment.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;