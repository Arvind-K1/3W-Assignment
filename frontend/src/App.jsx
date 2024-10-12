import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Login from './pages/Login';
import Registration from './pages/Registration';  
import UserForm from './pages/UserForm';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';  

function App() {
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    const decode = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      return JSON.parse(jsonPayload);
    };

    const decodedToken = decode(token);
    role = decodedToken.role;
  }

  return (
    <Router>
      <Navbar />  
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />  
        <Route
          path="/user-form"
          element={
            <ProtectedRoute role={role} requiredRole="user" element={<UserForm />} />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role={role} requiredRole="admin" element={<AdminDashboard />} />
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
