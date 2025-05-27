import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function NoteEditor() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await api.get('/notes');
    setNotes(res.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    await api.post('/notes', form);
    fetchNotes();
  };

  return (
    <div className="container">
      <h2>Your Notes & Reflections</h2>
      <form onSubmit={addNote}>
        <textarea
          placeholder="Write something..."
          rows="4"
          onChange={e => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default NoteEditor;
