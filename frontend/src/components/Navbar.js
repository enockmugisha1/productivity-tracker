import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/goals">Goals</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/habits">Habits</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
