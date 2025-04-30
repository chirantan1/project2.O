import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import AddPatient from './pages/AddPatient';
import PatientList from './pages/PatientList';
import AppointmentList from './pages/AppointmentList';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';




function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/add-patient"
            element={<ProtectedRoute><AddPatient /></ProtectedRoute>}
          />
          <Route
            path="/patients"
            element={<ProtectedRoute><PatientList /></ProtectedRoute>}
          />
          <Route
            path="/appointments"
            element={<ProtectedRoute><AppointmentList /></ProtectedRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
