import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import {
  CheckCircleIcon,
  FlagIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';

interface Stats {
  totalTasks: number;
  completedTasks: number;
  activeGoals: number;
  activeHabits: number;
  totalNotes: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    completedTasks: 0,
    activeGoals: 0,
    activeHabits: 0,
    totalNotes: 0,
  });
  const token = useAuthStore((state) => state.user?.getIdToken());
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  const stats_cards = [
    {
      name: 'Tasks',
      value: `${stats.completedTasks}/${stats.totalTasks}`,
      description: 'Completed',
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Active Goals',
      value: stats.activeGoals,
      description: 'In Progress',
      icon: FlagIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Active Habits',
      value: stats.activeHabits,
      description: 'Being Tracked',
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Notes',
      value: stats.totalNotes,
      description: 'Total',
      icon: DocumentTextIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.displayName}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your productivity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats_cards.map((card) => (
          <div
            key={card.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {card.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              <p className="ml-2 flex items-baseline text-sm text-gray-500">
                {card.description}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
} 