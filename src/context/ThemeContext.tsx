const { user, updateUserSettings } = useAuth();

// ... rest of the file ...

// Fix theme type assignment
const newTheme = themes[(currentIndex + 1) % themes.length] as 'light' | 'dark';
setTheme(newTheme);

// ... rest of the file ... 