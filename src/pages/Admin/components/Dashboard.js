import React, { useState } from 'react';
import '../styles/Dashboard.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, LineChart, Line, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ZAxis
} from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import hotelImage from '../assets/i1.webp';
import Navbar2 from './Navbar2';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  

  // Données pour les services supplémentaires
  const additionalServicesData = [
    { name: 'Gym', value: 50 },
    { name: 'Spa', value: 30 },
    { name: 'Restauration', value: 80 },
    { name: 'Service d\'urgence', value: 20 },
    { name: 'Service d\'étage', value: 60 },
  ];

  

  

  

  // Données pour la répartition du personnel (modifiée)
  const staffDistributionData = [
    { name: 'Hommes', value: 54, icon: faMars, color: '#3A5A78' }, // Bleu foncé
    { name: 'Femmes', value: 46, icon: faVenus, color: '#B38B6D' }, // Beige rosé
  ];

  const barChartData = [
    { name: 'Jan', Réservations: 40, Revenus: 12000 },
    { name: 'Fév', Réservations: 30, Revenus: 9000 },
    { name: 'Mar', Réservations: 20, Revenus: 6000 },
    { name: 'Avr', Réservations: 27, Revenus: 8100 },
    { name: 'Mai', Réservations: 18, Revenus: 5400 },
    { name: 'Juin', Réservations: 23, Revenus: 6900 },
    { name: 'Juil', Réservations: 34, Revenus: 10200 },
  ];

  const pieChartData = [
    { name: 'Chambres Occupées', value: 12 },
    { name: 'Chambres Disponibles', value: 25 },
  ];

  

  // Couleurs personnalisées pour le thème marron/beige
  const COLORS = {
    darkBrown: '#5E3023',
    mediumBrown: '#8B4513',
    lightBrown: '#D2B48C',
    cream: '#F5E7D8',
    sienna: '#A0522D',
    tan: '#D2B48C'
  };

  return (
    <div className="dashboard-container">
      <Navbar2 />
      <div className="dashboard-header">
        <h1>Bienvenue sur le tableau de bord de gestion</h1>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-left">
          
          <div className="dashboard-stats">
            <div className="stat-card"><h2>Chambres Disponibles</h2><p>25</p></div>
            <div className="stat-card"><h2>Réservations Actives</h2><p>12</p></div>
            <div className="stat-card"><h2>Utilisateurs Inscrits</h2><p>50</p></div>
          </div>
          <div className="chart-container">
            <h2>Réservations et Revenus par Mois</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.lightBrown} />
                <XAxis dataKey="name" stroke={COLORS.darkBrown} />
                <YAxis stroke={COLORS.darkBrown} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: COLORS.cream,
                    borderColor: COLORS.mediumBrown,
                    borderRadius: '5px'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    color: COLORS.darkBrown,
                    paddingTop: '10px'
                  }}
                />
                <Bar 
                  dataKey="Réservations" 
                  name="Réservations" 
                  fill={COLORS.darkBrown}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="Revenus" 
                  name="Revenus" 
                  fill={COLORS.sienna}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h2>Taux d'Occupation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                  outerRadius={80}
                  fill={COLORS.mediumBrown}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[COLORS.darkBrown, COLORS.sienna][index % 2]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: COLORS.cream,
                    border: `1px solid ${COLORS.tan}`,
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  itemStyle={{ color: COLORS.darkBrown }}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: COLORS.darkBrown, fontSize: '12px' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h2>Utilisation des Services Supplémentaires</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={additionalServicesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.lightBrown} />
                <XAxis dataKey="name" stroke={COLORS.darkBrown} />
                <YAxis stroke={COLORS.darkBrown} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: COLORS.cream,
                    borderColor: COLORS.mediumBrown
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: COLORS.darkBrown }}
                />
                <Bar 
                  dataKey="value" 
                  name="Utilisation" 
                  fill={COLORS.mediumBrown}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
        </div>
        <div className="dashboard-right">
          <div className="hotel-image-container">
            <img src={hotelImage} alt="Hôtel" className="hotel-image" />
          </div>
          <div className="calendar-section">
            <h2>Calendrier des Réservations</h2>
            <div className="custom-calendar">
              <Calendar 
                onChange={setDate} 
                value={date}
                className="marron-theme-calendar"
                tileClassName={({ date, view }) => {
                  const hasBooking = Math.random() > 0.7;
                  return hasBooking ? 'has-booking' : null;
                }}
              />
            </div>
          </div>
          {/* Répartition du Personnel */}
          <div className="staff-distribution">
            <h2>Répartition du Personnel</h2>
            <div className="distribution-container">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart
                  layout="vertical"
                  data={staffDistributionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" domain={[0, 100]} stroke="#5E3023" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#5E3023"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Pourcentage']}
                    contentStyle={{ 
                      backgroundColor: '#F5E7D8',
                      borderColor: '#8B4513',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Pourcentage"
                    background={{ fill: '#eee' }}
                  >
                    {staffDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="distribution-legend">
              {staffDistributionData.map((item, index) => (
                <div key={index} className="legend-item">
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    color={item.color} 
                    size="lg"
                    className="legend-icon"
                  />
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;