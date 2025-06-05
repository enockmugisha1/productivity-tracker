import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { FiSend, FiUser, FiCpu } from 'react-icons/fi'; // Icons for user and AI
import toast from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AiAssistant: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text: inputMessage,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Path should be /api/ai/ask for Vite proxy to forward to http://localhost:5007/api/ai/ask
      const response = await axios.post('/api/ai/ask', { prompt: userMessage.text });
      
      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        text: response.data.response,
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error: any) {
      console.error('Error fetching AI response:', error);
      const errorMessage = error.response?.data?.message || 'Failed to get response from AI. Please try again.';
      toast.error(errorMessage);
      // Optionally add the error as a message in the chat
      const errorAiMessage: Message = {
        id: Date.now().toString() + '-ai-error',
        text: `Error: ${errorMessage}`,
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-gray-50 rounded-lg shadow-md"> {/* Adjust height as needed based on your layout */}
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 rounded-t-lg shadow">
        <h1 className="text-xl font-semibold flex items-center">
          <FiCpu className="mr-2 h-6 w-6" /> AI Assistant
        </h1>
      </header>

      {/* Message Display Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-lg lg:max-w-xl px-4 py-3 rounded-xl shadow ${ 
                msg.sender === 'user'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.sender === 'user' ? (
                  <FiUser className="h-5 w-5 mr-2" />
                ) : (
                  <FiCpu className="h-5 w-5 mr-2" />
                )}
                <span className="font-semibold text-sm">{msg.sender === 'user' ? 'You' : 'AI Assistant'}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-lg lg:max-w-xl px-4 py-3 rounded-xl shadow bg-white text-gray-700">
              <div className="flex items-center">
                <FiCpu className="h-5 w-5 mr-2 animate-pulse" />
                <span className="font-semibold text-sm">AI Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
            placeholder="Ask the AI assistant anything..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition duration-150 flex items-center"
          >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <FiSend className="h-5 w-5" />
            )}
            <span className="ml-2 hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiAssistant; 