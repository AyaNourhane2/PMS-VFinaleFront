import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Header from "./components/Header";
import Footer from "./components/footer";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlusInformation from "./pages/PlusInformation";

// Employee Pages (lazy-loaded)
const EmployeeHome = lazy(() => import("./pages/EmpMain/pages/HomePagEmplyee"));
const AccountingDashboard = lazy(() => import("./pages/EmpMain/pages/AccountingDashboard"));
const HousekeepingDashboard = lazy(() => import("./pages/EmpMain/pages/HousekeepingDashboard"));
const ReceptionistDashboard = lazy(() => import("./pages/EmpMain/pages/ReceptionistDashboard"));
const AdditionalServicesPage = lazy(() => import("./pages/EmpMain/pages/AdditionalServicesPage"));
const ServiceDetailsPage = lazy(() => import("./pages/EmpMain/pages/ServiceDetailsPage"));

const PublicRoute = ({ element }) => {
  return (
    <div>
      <Header />
      {element}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute element={<Home />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
          <Route path="/plus-information" element={<PublicRoute element={<PlusInformation />} />} />

          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeHome />} />
          <Route path="/employee/accounting" element={<AccountingDashboard />} />
          <Route path="/employee/housekeeping" element={<HousekeepingDashboard />} />
          <Route path="/employee/receptionist/*" element={<ReceptionistDashboard />} />
          <Route path="/employee/additional-services" element={<AdditionalServicesPage />} />
          <Route path="/employee/service-details/:serviceId" element={<ServiceDetailsPage />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer 
        position="top-center" 
        autoClose={1000} 
        hideProgressBar={true} 
        closeOnClick 
        theme="colored" 
      />
    </Router>
  );
};

export default App;