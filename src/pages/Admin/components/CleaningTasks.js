// components/CleaningTasks.js
import React from 'react';
import '../styles/CleaningTasks.css'; // Vous pouvez créer ce fichier pour ajouter des styles

const CleaningTasks = () => {
  // Données de démonstration pour le tableau des tâches de ménage
  const tasks = [
    { id: 1, room: '1001', status: 'pending' },
    { id: 2, room: '1002', status: 'completed' },
    { id: 3, room: '100', status: 'pending' },
    { id: 4, room: '1004', status: 'completed' },
    { id: 5, room: '1005', status: 'pending' },
    // Ajoutez plus de tâches ici
  ];

  // Données de démonstration pour le tableau des demandes spéciales
  const specialRequests = [
    { id: 1, room: '1001', request: 'Nettoyage express', status: 'pending' },
    { id: 2, room: '1002', request: 'Remplacement des serviettes', status: 'completed' },
    { id: 3, room: '1003', request: 'Nettoyage des vitres', status: 'pending' },
    { id: 4, room: '1004', request: 'Nettoyage des couloirs', status: 'completed' },
    { id: 5, room: '1005', request: 'Nettoyage des salles de bain', status: 'pending' },
    // Ajoutez plus de demandes spéciales ici
  ];

  // Fonction pour marquer une tâche comme terminée
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    );
    console.log(updatedTasks);
  };

  // Fonction pour marquer une demande spéciale comme terminée
  const completeSpecialRequest = (requestId) => {
    const updatedRequests = specialRequests.map(request =>
      request.id === requestId ? { ...request, status: 'completed' } : request
    );
    console.log(updatedRequests);
  };

  return (
    <div className="cleaning-tasks-container">
      <h1>Tâches de Ménage</h1>
      <table className="cleaning-tasks-table">
        <thead>
          <tr>
            <th>ID de la Chambre</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.room}</td>
              <td>{task.status}</td>
              <td>
                {task.status === 'pending' ? (
                  <button onClick={() => completeTask(task.id)}>Marquer comme terminé</button>
                ) : (
                  <span>Déjà terminé</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cleaning-tasks-title">Demandes Spéciales</h2>
      <table className="cleaning-tasks-table">
        <thead>
          <tr>
            <th>ID de la Chambre</th>
            <th>Demande</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {specialRequests.map(request => (
            <tr key={request.id}>
              <td>{request.room}</td>
              <td>{request.request}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'pending' ? (
                  <button onClick={() => completeSpecialRequest(request.id)}>Marquer comme terminé</button>
                ) : (
                  <span>Déjà terminé</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CleaningTasks;