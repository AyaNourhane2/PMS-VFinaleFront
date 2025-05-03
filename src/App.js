import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Composants statiques
import Navbar from './pages/Admin/components/Navbar';
import Sidebar from "./pages/EmpMain/components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/footer";

// Icônes pour Sidebar
import { 
  FaHome, FaCalculator, FaBroom, FaConciergeBell, 
  FaPlus, FaList, FaInfoCircle, FaUserCog,
  FaBed, FaCalendarAlt, FaUsers, FaEnvelope,
  FaCog, FaClipboardList, FaMoneyBillWave,
  FaFileInvoiceDollar, FaBroom as FaCleaning,
  FaUserFriends, FaChartLine, FaExchangeAlt
} from 'react-icons/fa';

// Pages publiques (lazy-loaded)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const MoreInfo = lazy(() => import("./pages/PlusInformation"));

// Pages Admin (lazy-loaded)
const AdminDashboard = lazy(() => import("./pages/Admin/components/Dashboard"));
const RoomManagement = lazy(() => import("./pages/Admin/components/RoomManagement"));
const ReservationManagement = lazy(() => import("./pages/Admin/components/ReservationManagement"));
const UserManagement = lazy(() => import("./pages/Admin/components/UserManagement"));
const MessagesAndEmails = lazy(() => import("./pages/Admin/components/MessagesAndEmails"));
const Services = lazy(() => import("./pages/Admin/components/Services"));
const Payments = lazy(() => import("./pages/Admin/components/Payments"));
const Invoices = lazy(() => import("./pages/Admin/components/Invoices"));
const Taxes = lazy(() => import("./pages/Admin/components/Taxes"));
const CleaningService = lazy(() => import("./pages/Admin/components/CleaningService"));
const CleaningTasks = lazy(() => import("./pages/Admin/components/CleaningTasks"));
const StaffTracking = lazy(() => import("./pages/Admin/components/StaffTracking"));
const Settings = lazy(() => import("./pages/Admin/components/Settings"));
const CompatibleService = lazy(() => import("./pages/Admin/components/CompatibleService"));
const Reports = lazy(() => import("./pages/Admin/components/Reports"));

// Pages Employé (lazy-loaded)
const HomePagEmployee = lazy(() => import("./pages/EmpMain/pages/HomePageEmplyee"));
const AccountingDashboard = lazy(() => import("./pages/EmpMain/pages/AccountingDashboard"));
const HousekeepingDashboard = lazy(() => import("./pages/EmpMain/pages/HousekeepingDashboard"));
const ReceptionistDashboard = lazy(() => import("./pages/EmpMain/pages/ReceptionistDashboard"));
const ServiceDetailsPage = lazy(() => import("./pages/EmpMain/pages/ServiceDetailsPage"));
const AdditionalServicesPage = lazy(() => import("./pages/EmpMain/pages/AdditionalServicesPage"));

const App = () => {
  // Configuration des boutons pour Sidebar employé
  const employeeSidebarButtons = [
    { name: 'Accueil', icon: <FaHome />, path: '/employee' },
    { name: 'Comptabilité', icon: <FaCalculator />, path: '/employee/accounting' },
    { name: 'Ménage', icon: <FaBroom />, path: '/employee/housekeeping' },
    { name: 'Réception', icon: <FaConciergeBell />, path: '/employee/receptionist' },
    { name: 'Services', icon: <FaPlus />, path: '/employee/services' },
    { name: 'Informations', icon: <FaInfoCircle />, path: '/plus-information' },
  ];

  // Configuration des boutons pour Admin (optionnel)
  const adminSidebarButtons = [
    { name: 'Dashboard', icon: <FaHome />, path: '/admin/dashboard' },
    { name: 'Gestion Chambres', icon: <FaBed />, path: '/admin/room-management' },
    { name: 'Réservations', icon: <FaCalendarAlt />, path: '/admin/reservations' },
    { name: 'Utilisateurs', icon: <FaUsers />, path: '/admin/users' },
    { name: 'Messages', icon: <FaEnvelope />, path: '/admin/messages' },
    { name: 'Services', icon: <FaConciergeBell />, path: '/admin/services' },
    { name: 'Paiements', icon: <FaMoneyBillWave />, path: '/admin/payments' },
    { name: 'Factures', icon: <FaFileInvoiceDollar />, path: '/admin/invoices' },
    { name: 'Taxes', icon: <FaCalculator />, path: '/admin/taxes' },
    { name: 'Nettoyage', icon: <FaCleaning />, path: '/admin/cleaning' },
    { name: 'Tâches', icon: <FaClipboardList />, path: '/admin/cleaning-tasks' },
    { name: 'Personnel', icon: <FaUserFriends />, path: '/admin/staff-tracking' },
    { name: 'Rapports', icon: <FaChartLine />, path: '/admin/reports' },
    { name: 'Services Compatibles', icon: <FaExchangeAlt />, path: '/admin/compatible-service' },
    { name: 'Paramètres', icon: <FaCog />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Suspense fallback={<div className="loading-screen">Chargement en cours...</div>}>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<WithHeaderAndFooter><Home /></WithHeaderAndFooter>} />
          <Route path="/login" element={<WithHeaderAndFooter><Login /></WithHeaderAndFooter>} />
          <Route path="/signup" element={<WithHeaderAndFooter><Signup /></WithHeaderAndFooter>} />
          <Route path="/plus-information" element={<WithHeaderAndFooter><MoreInfo /></WithHeaderAndFooter>} />
          
          {/* Routes Admin */}
          <Route path="/admin/*" element={
            <AdminRoutes 
              sidebarButtons={adminSidebarButtons} 
              onLogout={handleLogout} 
            />
          } />
          
          {/* Routes Employé */}
          <Route path="/employee/*" element={
            <EmployeeRoutes 
              sidebarButtons={employeeSidebarButtons} 
              onLogout={handleLogout} 
            />
          } />
          
          {/* Redirection pour 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
};

// Routes Admin
const AdminRoutes = ({ sidebarButtons, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <div className="admin-layout">
      <Navbar 
        adminName="Administrateur" 
        onLogout={onLogout}
        onNavigate={(path) => navigate(path)}
      />
      
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/room-management" element={<RoomManagement />} />
          <Route path="/reservations" element={<ReservationManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/messages" element={<MessagesAndEmails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/taxes" element={<Taxes />} />
          <Route path="/cleaning" element={<CleaningService />} />
          <Route path="/cleaning-tasks" element={<CleaningTasks />} />
          <Route path="/staff-tracking" element={<StaffTracking />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/compatible-service" element={<CompatibleService />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

// Routes Employé
const EmployeeRoutes = ({ sidebarButtons, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <Routes>
      {/* Page d'accueil employé */}
      <Route path="/" element={<HomePagEmployee />} />
      
      {/* Tableau de bord comptable */}
      <Route path="/accounting" element={
        <WithSidebar 
          buttons={sidebarButtons} 
          onButtonClick={(path) => navigate(path)}
          onLogout={onLogout}
          activeButton="Comptabilité"
          profileImage="/assets/profilecomptable.webp"
          profileName="Comptable"
          profileRole="Service Comptabilité"
        >
          <AccountingDashboard />
        </WithSidebar>
      } />
      
      {/* Gestion ménage */}
      <Route path="/housekeeping" element={
        <WithSidebar 
          buttons={sidebarButtons} 
          onButtonClick={(path) => navigate(path)}
          onLogout={onLogout}
          activeButton="Ménage"
          profileImage="/assets/profilefemmemenage.webp"
          profileName="Agent de Ménage"
          profileRole="Service Nettoyage"
        >
          <HousekeepingDashboard />
        </WithSidebar>
      } />
      
      {/* Réception */}
      <Route path="/receptionist" element={
        <WithSidebar 
          buttons={sidebarButtons} 
          onButtonClick={(path) => navigate(path)}
          onLogout={onLogout}
          activeButton="Réception"
          profileImage="/assets/profilereceptioniste.webp"
          profileName="Réceptionniste"
          profileRole="Service Réception"
        >
          <ReceptionistDashboard />
        </WithSidebar>
      } />
      
      {/* Liste des services - sans sidebar */}
      <Route path="/services" element={<AdditionalServicesPage />} />
      
      {/* Détails d'un service spécifique - sans sidebar */}
      <Route path="/services/:serviceId" element={<ServiceDetailsPage />} />
    </Routes>
  );
};

// Composant pour les pages avec Sidebar
const WithSidebar = ({ 
  children, 
  buttons, 
  onButtonClick,
  onLogout, 
  activeButton, 
  profileImage,
  profileName,
  profileRole
}) => {
  return (
    <div className="employee-layout">
      <Sidebar 
        buttons={buttons}
        onButtonClick={onButtonClick}
        activeButton={activeButton}
        onLogout={onLogout}
        dashboardName="Tableau de Bord Employé"
        profileImage={profileImage}
        profileName={profileName}
        profileRole={profileRole}
      />
      <div className="employee-content">
        {children}
      </div>
    </div>
  );
};

// Composant pour les pages avec Header et Footer
const WithHeaderAndFooter = ({ children }) => {
  return (
    <div className="public-layout">
      <Header />
      <div className="public-content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default App;