import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiCamera, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateProfilePicture } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await updateProfilePicture(file);
      toast.success('Profile picture updated successfully');
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : user?.photoURL ? (
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
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors"
                >
                  <FiCamera className="w-5 h-5" />
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user?.displayName}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>

              {previewUrl && (
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="btn btn-primary"
                  >
                    {isUploading ? 'Uploading...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Display Name</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{user?.displayName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Account Created</label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Theme</label>
                  <p className="mt-1 text-gray-900 dark:text-white capitalize">{user?.settings?.theme || 'Light'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Email Notifications</label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user?.settings?.emailNotifications ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Push Notifications</label>
                  <p className="mt-1 text-gray-900 dark:text-white">
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