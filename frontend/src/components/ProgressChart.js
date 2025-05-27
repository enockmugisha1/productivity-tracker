import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../utils/api';

function ProgressChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const goalRes = await api.get('/goals');
      const habitRes = await api.get('/habits');

      const chartData = [
        { name: 'Goals', progress: avgProgress(goalRes.data) },
        { name: 'Habits', progress: avgStreak(habitRes.data) }
      ];
      setData(chartData);
    };

    fetchProgress();
  }, []);

  const avgProgress = (goals) => {
    if (goals.length === 0) return 0;
    const total = goals.reduce((acc, goal) => acc + goal.progress, 0);
    return Math.round(total / goals.length);
  };

  const avgStreak = (habits) => {
    if (habits.length === 0) return 0;
    const total = habits.reduce((acc, habit) => acc + habit.streak, 0);
    return Math.round(total / habits.length);
  };

  return (
    <div className="container">
      <h2>Progress Overview</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="progress" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default ProgressChart;
