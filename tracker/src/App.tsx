import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';

// Lazy load route components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Goals = lazy(() => import('./pages/Goals'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Habits = lazy(() => import('./pages/Habits'));
const Notes = lazy(() => import('./pages/Notes'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const AiAssistant = lazy(() => import('./pages/AiAssistant'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

// Define a new Layout wrapper for protected routes
const ProtectedLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <Layout /> 
    </ProtectedRoute>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes using the new Layout structure */}
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/ai-assistant" element={<AiAssistant />} />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
