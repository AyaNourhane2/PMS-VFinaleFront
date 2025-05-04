import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Composants statiques
import Navbar from './pages/Admin/components/Navbar';
import Header from "./components/Header";
import Footer from "./components/footer";

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
            <AdminRoutes onLogout={handleLogout} />
          } />
          
          {/* Routes Employé - sans sidebar */}
          <Route path="/employee" element={<HomePagEmployee />} />
          <Route path="/employee/accounting" element={<AccountingDashboard />} />
          <Route path="/employee/housekeeping" element={<HousekeepingDashboard />} />
          <Route path="/employee/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/employee/services" element={<AdditionalServicesPage />} />
          <Route path="/employee/services/:serviceId" element={<ServiceDetailsPage />} />
          
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
const AdminRoutes = ({ onLogout }) => {
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