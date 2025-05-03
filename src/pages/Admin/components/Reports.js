import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
//import '../styles/Reports.css';

// Palette de couleurs pour les graphiques
const COLORS = ['#6c5ce7', '#00b894', '#ff7675', '#fdcb6e', '#74b9ff'];

const Reports = () => {
  // État pour stocker les données
  const [selectedPeriod, setSelectedPeriod] = useState('monthly'); // 'monthly' (mensuel), 'quarterly' (trimestriel), 'annual' (annuel)
  const [hotelData, setHotelData] = useState({
    revenue: 250000, // Revenu total
    operatingCosts: 150000, // Coûts d'exploitation
    occupancyRate: 85, // Taux d'occupation
    avgRevenuePerRoom: 120, // Revenu moyen par chambre
    customerRetentionRate: 70, // Taux de fidélisation des clients
  });

  // Données sur les segments clients
  const [customerSegments, setCustomerSegments] = useState([
    { segment: 'Voyageurs d’affaires', percentage: 40 },
    { segment: 'Voyageurs de loisirs', percentage: 35 },
    { segment: 'Réservations groupées', percentage: 15 },
    { segment: 'Autres', percentage: 10 },
  ]);

  // Données sur les performances marketing
  const [marketingPerformance, setMarketingPerformance] = useState([
    { campaign: 'Publicités sur les réseaux sociaux', roi: 25 }, // ROI : Retour sur investissement
    { campaign: 'Marketing par e-mail', roi: 30 },
    { campaign: 'Partenariats', roi: 20 },
    { campaign: 'Événements hors ligne', roi: 15 },
  ]);

  // Données pour les graphiques
  const revenueData = [
    { month: 'Jan', revenue: 20000 },
    { month: 'Fév', revenue: 22000 },
    { month: 'Mar', revenue: 25000 },
    { month: 'Avr', revenue: 28000 },
    { month: 'Mai', revenue: 30000 },
  ];

  const operatingCostsData = [
    { category: 'Maintenance', cost: 50000 },
    { category: 'Salaires', cost: 70000 },
    { category: 'Fournitures', cost: 30000 },
  ];

  // Gestion du changement de période
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // Simuler le chargement de nouvelles données selon la période sélectionnée
    if (period === 'quarterly') {
      setHotelData((prev) => ({
        ...prev,
        revenue: prev.revenue * 3,
        operatingCosts: prev.operatingCosts * 3,
      }));
    } else if (period === 'annual') {
      setHotelData((prev) => ({
        ...prev,
        revenue: prev.revenue * 12,
        operatingCosts: prev.operatingCosts * 12,
      }));
    }
  };

  return (
    <div className="financial-analysis">
      <h1>Analyse des Performances Financières</h1>

      {/* Filtre de période */}
      <div className="period-filter">
        <label>Période :</label>
        <button onClick={() => handlePeriodChange('monthly')} className={selectedPeriod === 'monthly' ? 'active' : ''}>
          Mensuel
        </button>
        <button onClick={() => handlePeriodChange('quarterly')} className={selectedPeriod === 'quarterly' ? 'active' : ''}>
          Trimestriel
        </button>
        <button onClick={() => handlePeriodChange('annual')} className={selectedPeriod === 'annual' ? 'active' : ''}>
          Annuel
        </button>
      </div>

      {/* Section des indicateurs financiers */}
      <section className="financial-metrics">
        <h2>Indicateurs Financiers</h2>
        <div className="metrics-grid">
          <div className="metric">
            <span>Revenu Total</span>
            <strong>{hotelData.revenue.toLocaleString()} €</strong>
          </div>
          <div className="metric">
            <span>Coûts d'Exploitation</span>
            <strong>{hotelData.operatingCosts.toLocaleString()} €</strong>
          </div>
          <div className="metric">
            <span>Taux d'Occupation</span>
            <strong>{hotelData.occupancyRate}%</strong>
          </div>
          <div className="metric">
            <span>Revenu Moyen par Chambre</span>
            <strong>{hotelData.avgRevenuePerRoom} €</strong>
          </div>
          <div className="metric">
            <span>Taux de Fidélisation</span>
            <strong>{hotelData.customerRetentionRate}%</strong>
          </div>
        </div>
      </section>

      {/* Section des graphiques */}
      <section className="charts">
        <h2>Graphiques des Performances</h2>
        <div className="chart-container">
          {/* Graphique des revenus */}
          <div className="chart">
            <h3>Revenus ({selectedPeriod})</h3>
            <BarChart width={400} height={300} data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#6c5ce7" />
            </BarChart>
          </div>

          {/* Graphique des coûts d'exploitation */}
          <div className="chart">
            <h3>Coûts d'Exploitation</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={operatingCostsData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="cost"
              >
                {operatingCostsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </section>

      {/* Section des segments clients */}
      <section className="customer-segments">
        <h2>Analyse des Segments Clients</h2>
        <p>Les segments de marché les plus rentables :</p>
        <ul>
          {customerSegments.map((segment, index) => (
            <li key={index}>
              {segment.segment}: <strong>{segment.percentage}%</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* Section des performances marketing */}
      <section className="marketing-performance">
        <h2>Rapports de Marketing</h2>
        <BarChart width={600} height={300} data={marketingPerformance}>
          <XAxis dataKey="campaign" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="roi" fill="#00b894" />
        </BarChart>
      </section>
    </div>
  );
};

export default Reports;