import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const res = await api.get('/habits');
    setHabits(res.data);
  };

  const addHabit = async (e) => {
    e.preventDefault();
    await api.post('/habits', form);
    fetchHabits();
  };

  const markComplete = async (habitId) => {
    await api.post(`/habits/${habitId}/complete`);
    fetchHabits();
  };

  return (
    <div className="container">
      <h2>Habit Tracker</h2>
      <form onSubmit={addHabit}>
        <input
          type="text"
          placeholder="Habit name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <button type="submit">Add Habit</button>
      </form>
      <ul>
        {habits.map(habit => (
          <li key={habit._id}>
            {habit.name} - 🔁 {habit.streak} day streak
            <button onClick={() => markComplete(habit._id)}>Mark Today</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;
