import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';

interface Note {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', category: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/notes');
      setNotes(response.data);
    } catch (error) {
      toast.error('Failed to fetch notes');
      console.error("Fetch notes error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingNote) {
      setEditingNote({ ...editingNote, [name]: value });
    } else {
      setNewNote({ ...newNote, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const noteData = editingNote || newNote;
    const url = editingNote ? `/api/notes/${editingNote._id}` : '/api/notes';
    const method = editingNote ? 'put' : 'post';

    try {
      await axios[method](url, noteData);
      toast.success(editingNote ? 'Note updated successfully' : 'Note created successfully');
      setNewNote({ title: '', content: '', category: '' });
      setEditingNote(null);
      setIsFormVisible(false);
      fetchNotes();
    } catch (error) {
      toast.error(editingNote ? 'Failed to update note' : 'Failed to create note');
      console.error("Submit note error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/notes/${noteId}`);
        toast.success('Note deleted successfully');
        fetchNotes();
      } catch (error) {
        toast.error('Failed to delete note');
        console.error("Delete note error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setNewNote({ title: '', content: '', category: '' });
    setIsFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setEditingNote(null);
    setNewNote({ title: '', content: '', category: '' });
  };

  const NoteForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingNote ? 'Edit Note' : 'Add New Note'}
      </h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={editingNote ? editingNote.title : newNote.title}
          onChange={handleInputChange}
          placeholder="Note Title"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category (Optional)
        </label>
        <input
          type="text"
          name="category"
          id="category"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Work, Personal, Ideas"
          value={editingNote ? editingNote.category : newNote.category}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={editingNote ? editingNote.content : newNote.content}
          onChange={handleInputChange}
          placeholder="Write your note here..."
        />
      </div>
      <div className="flex items-center justify-end space-x-3">
        <button 
          type="button"
          onClick={() => { setIsFormVisible(false); setEditingNote(null); }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Cancel
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (editingNote ? <FiEdit2 className="mr-2 h-4 w-4"/> : <FiPlus className="mr-2 h-4 w-4"/>)}
          {editingNote ? 'Save Changes' : 'Add Note'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
        <button 
            onClick={toggleFormVisibility}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            {isFormVisible && !editingNote ? 'Cancel' : (editingNote ? 'Cancel Edit' : 'Add New Note')}
        </button>
      </div>

      {isFormVisible && <NoteForm />}

      {isLoading && notes.length === 0 && <p className="text-center text-gray-500">Loading notes...</p>}
      {!isLoading && notes.length === 0 && !isFormVisible && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No notes yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new note.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={toggleFormVisibility}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiPlus className="-mr-1 ml-2 h-5 w-5" />
              New Note
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note) => (
          <div key={note._id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800 break-all">{note.title}</h3>
                {note.category && (
                  <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 whitespace-nowrap">
                    {note.category}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap flex-grow min-h-[60px]">{note.content}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 mb-3">
                    Last updated: {new Date(note.updatedAt).toLocaleString()}
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => handleEdit(note)}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors duration-150"
                        aria-label="Edit note"
                    >
                        <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => handleDelete(note._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors duration-150"
                        aria-label="Delete note"
                    >
                        <FiTrash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 