import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';
// import axios from 'axios'; // No longer needed here for baseURL setting

// Remove the default baseURL setting for Axios
// axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5007/api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
  </React.StrictMode>
);
