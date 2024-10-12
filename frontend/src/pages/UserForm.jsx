import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';
import '../styles/UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location = '/login';  
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.post('/api/users/upload', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Details uploaded successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Social Handle"
        value={socialHandle}
        onChange={(e) => setSocialHandle(e.target.value)}
      />
      <input
        type="file"
        multiple
        onChange={(e) => setImages(e.target.files)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UserForm;
