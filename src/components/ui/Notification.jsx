// Notification.jsx
import React from 'react';
import './Notification.css'; // Asegúrate de que la ruta al CSS sea correcta

const Notification = ({ message, type, onClose }) => (
  <div className={`notification ${type}`}>
    <p>{message}</p>
    {onClose && <button onClick={onClose}>Cerrar</button>}
  </div>
);

export default Notification;