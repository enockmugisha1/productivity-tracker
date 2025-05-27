import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', completed: false });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await api.post('/tasks', form);
    getTasks();
  };

  const toggleComplete = async (task) => {
    await api.put(`/tasks/${task._id}`, { ...task, completed: !task.completed });
    getTasks();
  };

  return (
    <div className="container">
      <h2>Daily Tasks</h2>
      <form onSubmit={addTask}>
        <input type="text" placeholder="Task title" onChange={e => setForm({ ...form, title: e.target.value })} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task)} />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
