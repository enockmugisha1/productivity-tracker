await updateUserSettings({ 
  theme: theme as 'light' | 'dark', 
  ...user?.settings, 
  ...notificationSettings 
}); 