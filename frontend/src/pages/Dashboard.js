import React from 'react';
import Navbar from '../components/Navbar';
import ProgressChart from '../components/ProgressChart';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <ProgressChart />
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome to Your Productivity Dashboard</h1>
    </div>
  );
}

export default Dashboard;
