import React from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import { Dialog, Transition } from '@headlessui/react';
import { 
  FiHome, FiCheckSquare, FiTarget, FiEdit3, FiUser, FiSettings, FiLogOut, FiMenu, FiX,
  FiSun, FiMoon, FiMonitor, FiDollarSign
} from 'react-icons/fi';

// ... rest of the file ... 