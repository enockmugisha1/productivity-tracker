import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface Habit {
  _id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  lastCompleted: string | null;
}

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    frequency: 'daily' as 'daily' | 'weekly',
  });
  const token = useAuthStore((state) => state.token);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('/habits', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(response.data);
    } catch (error) {
      toast.error('Failed to fetch habits');
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        '/habits',
        { ...newHabit, streak: 0 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewHabit({ title: '', description: '', frequency: 'daily' });
      toast.success('Habit created successfully');
      fetchHabits();
    } catch (error) {
      toast.error('Failed to create habit');
    }
  };

  const markHabitComplete = async (habitId: string) => {
    try {
      await axios.post(
        `/habits/${habitId}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchHabits();
      toast.success('Habit marked as complete');
    } catch (error) {
      toast.error('Failed to mark habit as complete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Habits</h1>
      </div>

      {/* Add Habit Form */}
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
            value={newHabit.title}
            onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
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
            value={newHabit.description}
            onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
            Frequency
          </label>
          <select
            id="frequency"
            className="input mt-1"
            value={newHabit.frequency}
            onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value as 'daily' | 'weekly' })}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Habit
        </button>
      </form>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit._id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{habit.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{habit.description}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Frequency: {habit.frequency}
                  </span>
                  <span className="text-sm text-primary-600">
                    🔥 {habit.streak} day streak
                  </span>
                </div>
              </div>
              <button
                onClick={() => markHabitComplete(habit._id)}
                className="btn btn-primary"
                disabled={habit.lastCompleted === new Date().toISOString().split('T')[0]}
              >
                Complete Today
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 