import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Tasks from './pages/Tasks';
import Habits from './pages/Habits';
import Notes from './pages/Notes';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
        <Route path="/habits" element={<PrivateRoute><Habits /></PrivateRoute>} />
        <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
