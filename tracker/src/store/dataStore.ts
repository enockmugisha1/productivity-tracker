import { create } from 'zustand';
import axios from 'axios';

interface Stats {
  totalTasks: number;
  completedTasks: number;
  activeGoals: number;
  activeHabits: number;
  totalNotes: number;
}

interface DataState {
  stats: Stats;
  loading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

const initialStats: Stats = {
  totalTasks: 0,
  completedTasks: 0,
  activeGoals: 0,
  activeHabits: 0,
  totalNotes: 0,
};

export const useDataStore = create<DataState>((set) => ({
  stats: initialStats,
  loading: false,
  error: null,
  fetchStats: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get('/api/stats');
      set({ stats: response.data, loading: false });
    } catch (error: any) {
      console.error('Failed to fetch stats', error);
      set({ error: 'Failed to fetch dashboard stats.', loading: false, stats: initialStats });
    }
  },
})); 