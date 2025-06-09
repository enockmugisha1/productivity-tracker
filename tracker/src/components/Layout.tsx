import React, { useState, Fragment, useMemo, useCallback } from 'react';
import { Link, NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dialog, Transition } from '@headlessui/react';
import { 
  FiHome, FiCheckSquare, FiTarget, FiEdit3, FiUser, FiSettings, FiLogOut, FiMenu, FiX, FiMessageSquare 
} from 'react-icons/fi'; // Feather icons
import OptimizedImage from './OptimizedImage';

interface LayoutProps {
  // children: React.ReactNode; // Removed children
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
  { name: 'Goals', path: '/goals', icon: <FiTarget /> },
  { name: 'Habits', path: '/habits', icon: <FiCheckSquare /> }, // Placeholder, choose better icon if available
  { name: 'Tasks', path: '/tasks', icon: <FiCheckSquare /> },
  { name: 'Notes', path: '/notes', icon: <FiEdit3 /> },
  { name: 'AI Assistant', path: '/ai-assistant', icon: <FiMessageSquare /> }, // New AI Assistant nav item
];

const SidebarContent = React.memo<{ onLinkClick?: () => void }>(({ onLinkClick }) => {
  const { logout, user } = useAuth();
  
  const menuItems = useMemo(() => [
    { to: '/dashboard', icon: FiHome, text: 'Dashboard' },
    { to: '/tasks', icon: FiCheckSquare, text: 'Tasks' },
    { to: '/goals', icon: FiTarget, text: 'Goals' },
    { to: '/habits', icon: FiEdit3, text: 'Habits' },
    { to: '/notes', icon: FiEdit3, text: 'Notes' },
    { to: '/ai-assistant', icon: FiMessageSquare, text: 'AI Assistant' },
  ], []);

  const bottomMenuItems = useMemo(() => [
    { to: '/profile', icon: FiUser, text: 'Profile' },
    { to: '/settings', icon: FiSettings, text: 'Settings' },
  ], []);

  const handleLogout = useCallback(async () => {
    if (onLinkClick) onLinkClick();
    await logout();
  }, [onLinkClick, logout]);

  const baseLinkClass = "flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200";
  const activeLinkClass = "bg-primary-500 text-white dark:bg-primary-600";

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700">
        {user?.photoURL ? (
          <OptimizedImage
            src={user.photoURL}
            alt={user.displayName || 'User avatar'}
            className="h-10 w-10 rounded-full object-cover"
            width={40}
            height={40}
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-lg font-bold">
            {user?.displayName?.charAt(0).toUpperCase() || '?'}
          </div>
        )}
        <div>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">{user?.displayName}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Productivity Tracker</p>
        </div>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map(item => (
          <NavLink
            key={item.text}
            to={item.to}
            onClick={onLinkClick}
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.text}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        {bottomMenuItems.map(item => (
          <NavLink
            key={item.text}
            to={item.to}
            onClick={onLinkClick}
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.text}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className={`${baseLinkClass} w-full text-red-500 dark:hover:bg-red-500 dark:hover:text-white`}
        >
          <FiLogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
});

SidebarContent.displayName = 'SidebarContent';

const Layout: React.FC<LayoutProps> = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error display if needed
    }
  }, [logout, navigate]);

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar with transition */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={toggleSidebar}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <FiX className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <SidebarContent onLinkClick={toggleSidebar} />
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 dark:bg-gray-900">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <FiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default React.memo(Layout); 