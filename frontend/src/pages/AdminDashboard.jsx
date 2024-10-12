import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => setUsers(response.data)).catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Social Handle: {user.socialHandle}</p>
            {user.images.map((image, idx) => (
              <img key={idx} src={image} alt="user upload" />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
