import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useDataStore } from '../store/dataStore';
import { FiPlus, FiRepeat, FiTrash2, FiZap } from 'react-icons/fi';

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
  const [newHabit, setNewHabit] = useState({ title: '', description: '', frequency: 'daily' as 'daily' | 'weekly' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { user } = useAuth();
  const fetchStats = useDataStore((state) => state.fetchStats);

  const fetchHabits = async () => {
    if (!user) { setHabits([]); return; }
    try {
      const response = await axios.get('/api/habits');
      setHabits(response.data);
    } catch (error) {
      toast.error('Failed to fetch habits');
      setHabits([]);
    }
  };

  useEffect(() => {
    if (user) fetchHabits();
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error('You must be logged in.'); return; }
    try {
      await axios.post('/api/habits', newHabit);
      setNewHabit({ title: '', description: '', frequency: 'daily' });
      setIsFormVisible(false);
      toast.success('Habit created successfully');
      fetchHabits();
      fetchStats();
    } catch (error) {
      toast.error('Failed to create habit');
    }
  };

  const markHabitComplete = async (habitId: string) => {
    if (!user) return;
    try {
      await axios.post(`/api/habits/${habitId}/complete`);
      fetchHabits();
      fetchStats();
      toast.success('Habit marked as complete!');
    } catch (error) {
      toast.error('Failed to complete habit');
    }
  };

  const deleteHabit = async (habitId: string) => {
      if(!user) return;
      if (window.confirm('Are you sure you want to delete this habit? This cannot be undone.')) {
          try {
              await axios.delete(`/api/habits/${habitId}`);
              fetchHabits();
              fetchStats();
              toast.success('Habit deleted');
          } catch (error) {
              toast.error('Failed to delete habit');
          }
      }
  }

  const AddHabitForm = () => (
    <form onSubmit={handleSubmit} className="card dark:bg-gray-800 space-y-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Habit</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input type="text" id="title" name="title" required className="input" value={newHabit.title} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
        <textarea id="description" name="description" rows={5} className="input" value={newHabit.description} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
        <select id="frequency" name="frequency" className="input" value={newHabit.frequency} onChange={handleInputChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={() => setIsFormVisible(false)} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Add Habit</button>
      </div>
    </form>
  );

  const HabitCard = ({ habit }: { habit: Habit }) => {
    const today = new Date().toISOString().split('T')[0];
    const isCompletedToday = habit.lastCompleted ? new Date(habit.lastCompleted).toISOString().split('T')[0] === today : false;

    return (
        <div className="card dark:bg-gray-800 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{habit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{habit.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-yellow-500 flex items-center">
                        <FiZap className="mr-1" /> {habit.streak}
                    </span>
                    <button onClick={() => deleteHabit(habit._id)} className="p-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                        <FiTrash2 />
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize flex items-center"><FiRepeat className="mr-2"/>{habit.frequency}</span>
                <button
                    onClick={() => markHabitComplete(habit._id)}
                    className="btn btn-primary"
                    disabled={isCompletedToday}
                >
                    {isCompletedToday ? 'Completed' : 'Complete Today'}
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Habits</h1>
        <button onClick={() => setIsFormVisible(!isFormVisible)} className="btn btn-primary flex items-center">
          <FiPlus className="mr-2" />
          {isFormVisible ? 'Close Form' : 'Add Habit'}
        </button>
      </div>

      {isFormVisible && <AddHabitForm />}

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {habits.length > 0 ? (
            habits.map((habit) => <HabitCard key={habit._id} habit={habit} />)
        ) : (
            <div className="text-center py-12 col-span-full">
                <FiRepeat className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-2">No habits yet</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Click "Add Habit" to get started.</p>
            </div>
        )}
      </div>
    </div>
  );
} 