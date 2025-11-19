import React, { useState, useContext, createContext } from 'react';

// 1. Create Contexts
const UserContext = createContext();
const ThemeContext = createContext();

// Main Component
const UseContextExample = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  });
  
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  return (
    // 2. Provide multiple contexts
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme, language, setLanguage }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ccc', 
          margin: '10px',
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000'
        }}>
          <h2>useContext Hook Examples</h2>
          
          <UserProfile />
          <ThemeSwitcher />
          <NestedComponent />
          <LanguageSwitcher />
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

// Component that uses UserContext
const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const updateUser = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: 'Jane Smith',
      role: 'admin'
    }));
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #999', margin: '10px 0' }}>
      <h3>User Profile (using useContext)</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={updateUser}>Update User</button>
    </div>
  );
};

// Component that uses ThemeContext
const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #999', margin: '10px 0' }}>
      <h3>Theme Switcher</h3>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

// Component that uses both contexts
const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const greetings = {
    en: 'Hello',
    es: 'Hola',
    fr: 'Bonjour',
    de: 'Hallo'
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #999', margin: '10px 0' }}>
      <h3>Language Switcher</h3>
      <p>{greetings[language]}, {user.name}!</p>
      <p>Current Language: {language.toUpperCase()}</p>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('es')}>Spanish</button>
      <button onClick={() => setLanguage('fr')}>French</button>
      <button onClick={() => setLanguage('de')}>German</button>
    </div>
  );
};

// Deeply nested component that uses context without prop drilling
const NestedComponent = () => {
  return (
    <div style={{ padding: '10px', border: '1px solid #999', margin: '10px 0' }}>
      <h3>Nested Component</h3>
      <Level1 />
    </div>
  );
};

const Level1 = () => {
  return (
    <div style={{ padding: '10px', margin: '5px', border: '1px dashed #666' }}>
      <p>Level 1</p>
      <Level2 />
    </div>
  );
};

const Level2 = () => {
  return (
    <div style={{ padding: '10px', margin: '5px', border: '1px dashed #666' }}>
      <p>Level 2</p>
      <Level3 />
    </div>
  );
};

const Level3 = () => {
  // Access context directly without passing props through levels
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ 
      padding: '10px', 
      margin: '5px', 
      border: '1px dashed #666',
      backgroundColor: theme === 'dark' ? '#555' : '#f0f0f0'
    }}>
      <p>Level 3 - Deeply nested</p>
      <p>Accessing user directly: {user.name}</p>
      <p>Current theme: {theme}</p>
    </div>
  );
};

export default UseContextExample;