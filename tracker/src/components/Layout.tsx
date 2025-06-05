import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, FiCheckSquare, FiTarget, FiEdit3, FiUser, FiSettings, FiLogOut, FiMenu, FiX 
} from 'react-icons/fi'; // Feather icons

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
  { name: 'Goals', path: '/goals', icon: <FiTarget /> },
  { name: 'Habits', path: '/habits', icon: <FiCheckSquare /> }, // Placeholder, choose better icon if available
  { name: 'Tasks', path: '/tasks', icon: <FiCheckSquare /> },
  { name: 'Notes', path: '/notes', icon: <FiEdit3 /> },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error display if needed
    }
  };

  const SidebarContent = () => (
    <>
      <div className="px-6 py-4">
        <Link to="/dashboard" className="text-2xl font-bold text-white">
          ProdTrack
        </Link>
      </div>
      <nav className="mt-6 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-base font-medium rounded-md transition-colors duration-150 
              ${isActive
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)} // Close sidebar on mobile nav click
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User section at the bottom of sidebar */}
      <div className="px-6 py-4 mt-auto border-t border-gray-700">
        <div className="flex items-center mb-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="h-10 w-10 rounded-full mr-3 object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-semibold mr-3">
              {user?.displayName?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-white">{user?.displayName}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <NavLink 
          to="/profile"
          className={({ isActive }) =>
            `flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 
            ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <FiUser className="mr-2" /> Profile
        </NavLink>
        <NavLink 
          to="/settings"
          className={({ isActive }) =>
            `flex items-center w-full px-3 py-2 mt-1 text-sm font-medium rounded-md transition-colors duration-150 
            ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <FiSettings className="mr-2" /> Settings
        </NavLink>
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 mt-1 text-sm font-medium text-red-400 hover:bg-red-700 hover:text-white rounded-md transition-colors duration-150"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-800 text-white fixed inset-y-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (drawer) */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
          {/* Sidebar */}
          <aside className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 text-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <FiX className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent />
          </aside>
          <div className="flex-shrink-0 w-14" aria-hidden="true">{/* Dummy element to force sidebar to shrink to fit close icon */ }</div>
        </div>
      )}

      {/* Main content area */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile Header with Hamburger Menu */}
        <header className="md:hidden bg-gray-800 text-white shadow-md sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/dashboard" className="text-xl font-bold">
                ProdTrack
              </Link>
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open sidebar</span>
                <FiMenu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page title could go here or be set by each page component */}
          {/* <h1 className="text-2xl font-semibold text-gray-900 mb-6">Page Title</h1> */}
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Productivity Tracker. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout; 