import React from 'react';
import ReactDOM from 'react-dom/client'; // createRoot funksiyasini import qilish
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // root element yaratish
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
