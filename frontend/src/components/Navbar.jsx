import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');  
  };

  return (
    <nav>
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
