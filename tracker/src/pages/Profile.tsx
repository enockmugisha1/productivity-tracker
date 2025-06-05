import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto mb-4 text-4xl">
                  {user?.displayName.charAt(0)}
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.displayName}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Display Name</label>
                  <p className="mt-1 text-gray-900">{user?.displayName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="mt-1 text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Account Created</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Theme</label>
                  <p className="mt-1 text-gray-900 capitalize">{user?.settings?.theme || 'Light'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email Notifications</label>
                  <p className="mt-1 text-gray-900">
                    {user?.settings?.emailNotifications ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Push Notifications</label>
                  <p className="mt-1 text-gray-900">
                    {user?.settings?.pushNotifications ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 