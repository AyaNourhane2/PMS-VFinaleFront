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
  const [searchTerm, setSearchTerm] = useState('');

  // Données pour les services supplémentaires
  const additionalServicesData = [
    { name: 'Gym', value: 50 },
    { name: 'Spa', value: 30 },
    { name: 'Restauration', value: 80 },
    { name: 'Service d\'urgence', value: 20 },
    { name: 'Service d\'étage', value: 60 },
  ];

  // Données pour les services compatibles
  const compatibleServicesData = [
    { month: 'Jan', Taxes: 1200, Paiements: 3000, Factures: 2500 },
    { month: 'Fév', Taxes: 1300, Paiements: 3200, Factures: 2600 },
    { month: 'Mar', Taxes: 1400, Paiements: 3400, Factures: 2700 },
    { month: 'Avr', Taxes: 1500, Paiements: 3600, Factures: 2800 },
    { month: 'Mai', Taxes: 1600, Paiements: 3800, Factures: 2900 },
    { month: 'Juin', Taxes: 1700, Paiements: 4000, Factures: 3000 },
    { month: 'Juil', Taxes: 1800, Paiements: 4200, Factures: 3100 },
  ];

  // Données pour les services de ménage
  const cleaningServicesData = [
    { subject: 'Tâches de Ménage', A: 80, fullMark: 100 },
    { subject: 'Demandes Spéciales', A: 60, fullMark: 100 },
    { subject: 'Commande de Produits', A: 70, fullMark: 100 },
    { subject: 'Suivi Personnel', A: 90, fullMark: 100 },
  ];

  // Nouvelles données pour les performances du personnel
  const staffPerformanceData = [
    { name: 'Jean D.', efficiency: 85, tasksCompleted: 42, hoursWorked: 35 },
    { name: 'Marie L.', efficiency: 92, tasksCompleted: 38, hoursWorked: 32 },
    { name: 'Pierre T.', efficiency: 78, tasksCompleted: 35, hoursWorked: 40 },
    { name: 'Sophie B.', efficiency: 88, tasksCompleted: 45, hoursWorked: 38 },
    { name: 'Luc M.', efficiency: 95, tasksCompleted: 50, hoursWorked: 45 },
    { name: 'Emma R.', efficiency: 82, tasksCompleted: 36, hoursWorked: 34 },
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

  const scatterChartData = staffPerformanceData.map(staff => ({
    x: staff.hoursWorked,
    y: staff.tasksCompleted,
    z: staff.efficiency,
    name: staff.name
  }));

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
          <div className="chart-container">
            <h2>Tendances des Services Compatibles</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={compatibleServicesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.lightBrown} />
                <XAxis dataKey="month" stroke={COLORS.darkBrown} />
                <YAxis stroke={COLORS.darkBrown} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: COLORS.cream,
                    borderColor: COLORS.mediumBrown,
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  itemStyle={{ color: COLORS.darkBrown }}
                />
                <Legend 
                  wrapperStyle={{ color: COLORS.darkBrown }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Taxes" 
                  stroke="#5E3023" 
                  activeDot={{ r: 8, fill: '#5E3023', stroke: '#fff', strokeWidth: 2 }} 
                  name="Taxes"
                />
                <Line 
                  type="monotone" 
                  dataKey="Paiements" 
                  stroke="#8B4513" 
                  activeDot={{ r: 8, fill: '#8B4513', stroke: '#fff', strokeWidth: 2 }} 
                  name="Paiements"
                />
                <Line 
                  type="monotone" 
                  dataKey="Factures" 
                  stroke="#A0522D" 
                  activeDot={{ r: 8, fill: '#A0522D', stroke: '#fff', strokeWidth: 2 }} 
                  name="Factures"
                />
              </LineChart>
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

          {/* Performance des Services de Ménage */}
          <div className="chart-container-small">
            <h2>Performance des Services de Ménage</h2>
            <ResponsiveContainer width="100%" height={150}>
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="80%" 
                data={cleaningServicesData}
              >
                <PolarGrid stroke={COLORS.lightBrown} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  stroke={COLORS.darkBrown}
                />
                <PolarRadiusAxis 
                  stroke={COLORS.darkBrown}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: COLORS.cream,
                    borderColor: COLORS.mediumBrown,
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  itemStyle={{ color: COLORS.darkBrown }}
                />
                <Radar 
                  name="Performance" 
                  dataKey="A" 
                  stroke={COLORS.mediumBrown}
                  fill={COLORS.lightBrown}
                  fillOpacity={0.6}
                />
                <Legend 
                  wrapperStyle={{ 
                    color: COLORS.darkBrown,
                    paddingTop: '10px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Performances du Personnel */}
          <div className="chart-container-small">
            <h2>Performances du Personnel</h2>
            <ResponsiveContainer width="100%" height={150}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.lightBrown} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Heures" 
                  unit="h" 
                  stroke={COLORS.darkBrown}
                  label={{ value: 'Heures travaillées', position: 'bottom', fill: COLORS.darkBrown }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Tâches" 
                  unit="" 
                  stroke={COLORS.darkBrown}
                  label={{ value: 'Tâches accomplies', angle: -90, position: 'left', fill: COLORS.darkBrown }}
                />
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[60, 400]} 
                  name="Efficacité" 
                  unit="%"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: COLORS.cream,
                    borderColor: COLORS.mediumBrown,
                    borderRadius: '6px'
                  }}
                  formatter={(value, name, props) => {
                    if (name === 'Efficacité') return [`${value}%`, name];
                    if (name === 'Tâches') return [value, 'Tâches accomplies'];
                    if (name === 'Heures') return [value, 'Heures travaillées'];
                    return [value, name];
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: COLORS.darkBrown }}
                  formatter={(value) => {
                    if (value === 'x') return 'Heures travaillées';
                    if (value === 'y') return 'Tâches accomplies';
                    if (value === 'z') return 'Efficacité (%)';
                    return value;
                  }}
                />
                <Scatter 
                  name="Performance" 
                  data={scatterChartData} 
                  fill={COLORS.mediumBrown}
                  shape="circle"
                >
                  {scatterChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[
                        COLORS.darkBrown,
                        COLORS.mediumBrown,
                        COLORS.sienna,
                        '#895737',
                        '#A88B76',
                        '#5E3023'
                      ][index % 6]}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;