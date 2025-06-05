import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user, updateUserSettings } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    theme: user?.settings?.theme || 'light',
    emailNotifications: user?.settings?.emailNotifications ?? true,
    pushNotifications: user?.settings?.pushNotifications ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      await updateUserSettings(settings);
      setSuccess('Settings updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h5 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h5>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                      Theme
                    </label>
                    <select
                      id="theme"
                      name="theme"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={settings.theme}
                      onChange={handleChange}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h5 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                      />
                      <label className="ml-2 block text-sm text-gray-700" htmlFor="emailNotifications">
                        Email Notifications
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Receive email notifications for tasks, goals, and habits
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                        id="pushNotifications"
                        name="pushNotifications"
                        checked={settings.pushNotifications}
                        onChange={handleChange}
                      />
                      <label className="ml-2 block text-sm text-gray-700" htmlFor="pushNotifications">
                        Push Notifications
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Receive browser notifications for reminders and updates
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 