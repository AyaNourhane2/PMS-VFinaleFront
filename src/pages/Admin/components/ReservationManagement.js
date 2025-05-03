import React from 'react';
import '../styles/ReservationManagement.css';

function ReservationManagement() {
  const reservations = [
    {
      id: 1,
      roomNumber: '1001',
      guestName: 'John Doe',
      guestPhone: '+1234567890',
      guestEmail: 'john.doe@example.com',
      date: '01-04-2025',
      time: '14:00',
      duration: '2 nights'
    },
    {
      id: 2,
      roomNumber: '1002',
      guestName: 'Alice Martin',
      guestPhone: '+0987654321',
      guestEmail: 'alice.martin@example.com',
      date: '01-04-2025',
      time: '15:30',
      duration: '3 nights'
    },
    {
      id: 3,
      roomNumber: '1003',
      guestName: 'Carlos Alvarez',
      guestPhone: '+1122334455',
      guestEmail: 'carlos.alvarez@example.com',
      date: '01-04-2025',
      time: '10:00',
      duration: '1 night'
    },
    {
      id: 4,
      roomNumber: '1004',
      guestName: 'Sophie Dubois',
      guestPhone: '+6677889900',
      guestEmail: 'sophie.dubois@example.com',
      date: '01-04-2025',
      time: '18:45',
      duration: '4 nights'
    },
    {
      id: 5,
      roomNumber: '1005',
      guestName: 'Liam Chen',
      guestPhone: '+1122334455',
      guestEmail: 'liam.chen@example.com',
      date: '01-04-2025',
      time: '12:15',
      duration: '2 nights'
    },
    {
      id: 6,
      roomNumber: '1006',
      guestName: 'Fatima Zahra',
      guestPhone: '+9876543210',
      guestEmail: 'fatima.zahra@example.com',
      date: '01-04-2025',
      time: '09:00',
      duration: '5 nights'
    },
    {
      id: 7,
      roomNumber: '1007',
      guestName: 'Noah Williams',
      guestPhone: '+1122334455',
      guestEmail: 'noah.williams@example.com',
      date: '01-04-2025',
      time: '20:30',
      duration: '3 nights'
    }
  ];

  return (
    <div className="reservation-management">
      <div className="reservation-list">
        <h3 className="reservation-list-title">Liste des Réservations</h3>
        {reservations.length > 0 ? (
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Chambre</th>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.roomNumber}</td>
                  <td>{reservation.guestName}</td>
                  <td>{reservation.guestPhone}</td>
                  <td>{reservation.guestEmail}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-reservations">Aucune réservation disponible.</p>
        )}
      </div>
    </div>
  );
}

export default ReservationManagement;