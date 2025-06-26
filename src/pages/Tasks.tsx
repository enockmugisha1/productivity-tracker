import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useDataStore } from '../store/dataStore';
import { FiPlus, FiTrash2, FiCalendar } from 'react-icons/fi';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

// ... rest of the file ... 