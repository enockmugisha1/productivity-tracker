import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function GoalList() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = async () => {
    const res = await api.get('/goals');
    setGoals(res.data);
  };

  const addGoal = async (e) => {
    e.preventDefault();
    await api.post('/goals', form);
    getGoals();
  };

  return (
    <div className="container">
      <h2>Your Goals</h2>
      <form onSubmit={addGoal}>
        <input type="text" placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input type="text" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="date" onChange={e => setForm({ ...form, dueDate: e.target.value })} />
        <button type="submit">Add Goal</button>
      </form>
      <ul>
        {goals.map(goal => (
          <li key={goal._id}>{goal.title} - {goal.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
