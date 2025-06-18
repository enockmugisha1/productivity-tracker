import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth as firebaseAuth } from '../config/firebase'; // Import Firebase auth
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut, updateProfile } from 'firebase/auth'; // Import Firebase auth methods

interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  settings?: {
    theme: 'light' | 'dark';
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  updateUserSettings: (settings: User['settings']) => Promise<void>;
  updateProfilePicture: (file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          // Verify token with backend and get app-specific user data
          const response = await axios.post('/api/auth/verify-token', {
            token: idToken,
            firebaseUid: firebaseUser.uid
          });
          localStorage.setItem('token', response.data.token); // Assuming backend sends its own token
          setUser(response.data.user);
          setError(null);
        } catch (err: any) {
          console.error("Error verifying Firebase token with backend:", err);
          setError(err.response?.data?.message || 'Failed to authenticate with backend using Firebase.');
          localStorage.removeItem('token');
          setUser(null);
          await firebaseSignOut(firebaseAuth); // Sign out from Firebase if backend verification fails
        }
      } else {
        // No Firebase user, ensure app user is also null and token is cleared
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post('/api/auth/register', {
        email,
        password,
        displayName
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setLoading(true);
      await firebaseSignOut(firebaseAuth); // Sign out from Firebase
      localStorage.removeItem('token'); // Remove backend token
      setUser(null); // Clear user state
    } catch (err:any) {
       setError(err.message || 'Logout failed');
       console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
    } catch (err: any) {
      console.error("Google Sign-In error:", err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserSettings = async (settings: User['settings']) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        '/api/auth/settings',
        { settings },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUser(response.data.user);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update settings');
      throw error;
    }
  };

  const updateProfilePicture = async (file: File) => {
    try {
      setError(null);
      setLoading(true);

      // Create form data
      const formData = new FormData();
      formData.append('photo', file);

      // Upload to backend
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/auth/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      // Update Firebase profile
      if (firebaseAuth.currentUser) {
        await updateProfile(firebaseAuth.currentUser, {
          photoURL: response.data.photoURL
        });
      }

      // Update local user state
      setUser(prev => prev ? { ...prev, photoURL: response.data.photoURL } : null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile picture');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set up axios interceptor for token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    googleLogin,
    updateUserSettings,
    updateProfilePicture
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 