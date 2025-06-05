import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface Goal {
  _id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'abandoned';
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
  });
  const token = useAuthStore((state) => state.token);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data);
    } catch (error) {
      toast.error('Failed to fetch goals');
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        '/goals',
        { ...newGoal, progress: 0, status: 'active' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewGoal({ title: '', description: '', targetDate: '' });
      toast.success('Goal created successfully');
      fetchGoals();
    } catch (error) {
      toast.error('Failed to create goal');
    }
  };

  const updateProgress = async (goalId: string, progress: number) => {
    try {
      await axios.patch(
        `/goals/${goalId}`,
        { progress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchGoals();
      toast.success('Progress updated');
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  const updateStatus = async (goalId: string, status: Goal['status']) => {
    try {
      await axios.patch(
        `/goals/${goalId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchGoals();
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Goals</h1>
      </div>

      {/* Add Goal Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="input mt-1"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="input mt-1"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">
            Target Date
          </label>
          <input
            type="date"
            id="targetDate"
            required
            className="input mt-1"
            value={newGoal.targetDate}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Goal
        </button>
      </form>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{goal.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Target: {new Date(goal.targetDate).toLocaleDateString()}
                </p>
              </div>
              <select
                value={goal.status}
                onChange={(e) => updateStatus(goal._id, e.target.value as Goal['status'])}
                className="text-sm border-gray-300 rounded-md"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
              </select>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">Progress: {goal.progress}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateProgress(goal._id, Number(e.target.value))}
                  className="ml-4 flex-1"
                />
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 