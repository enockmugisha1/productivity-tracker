import React, { useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDataStore } from '../store/dataStore';
import {
  CheckCircleIcon,
  FlagIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const StatCard = React.memo<{
  name: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
}>(({ name, value, description, icon: Icon, color, bgColor }) => (
  <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
    <dt>
      <div className={`absolute rounded-md p-3 ${bgColor}`}>
        <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
      </div>
      <p className="ml-16 text-sm font-medium text-gray-500 truncate">
        {name}
      </p>
    </dt>
    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="ml-2 flex items-baseline text-sm text-gray-500">
        {description}
      </p>
    </dd>
  </div>
));

StatCard.displayName = 'StatCard';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { stats, loading: statsLoading, fetchStats } = useDataStore();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, fetchStats]);

  const stats_cards = useMemo(() => [
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
  ], [stats]);

  if (authLoading || statsLoading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

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
          <StatCard
            key={card.name}
            {...card}
          />
        ))}
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
} 