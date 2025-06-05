import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const user = useAuthStore((state) => state.user);

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    try {
      const idToken = await user.getIdToken();
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to create a task.');
      return;
    }
    try {
      const idToken = await user.getIdToken();
      await axios.post(
        '/api/tasks',
        newTask,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      setNewTask({ title: '', description: '', dueDate: '' });
      toast.success('Task created successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    if (!user) {
      toast.error('You must be logged in to update a task.');
      return;
    }
    try {
      const idToken = await user.getIdToken();
      await axios.patch(
        `/api/tasks/${taskId}`,
        {
          status: currentStatus === 'pending' ? 'completed' : 'pending',
        },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      fetchTasks();
      toast.success('Task status updated');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!user) {
      toast.error('You must be logged in to delete a task.');
      return;
    }
    try {
      const idToken = await user.getIdToken();
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      fetchTasks();
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
      </div>

      {/* Add Task Form */}
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
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
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
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="input mt-1"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {/* Tasks List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {Array.isArray(tasks) && tasks.map((task) => (
            <li key={task._id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => toggleTaskStatus(task._id, task.status)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-xs text-gray-400">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
