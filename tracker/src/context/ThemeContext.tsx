import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUserSettings, loading } = useAuth();
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme from localStorage or user settings
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (user?.settings?.theme) {
      setTheme(user.settings.theme);
    } else if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [user]);

  // Apply theme class to the root element and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (user) {
      await updateUserSettings({
        emailNotifications: false,
        pushNotifications: false,
        ...user.settings,
        theme: newTheme
      });
    }
  }, [theme, user, updateUserSettings]);

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}; 