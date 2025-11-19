// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// // import Aps from '../src/props/App2'
// //  import Aps from '../src/Counter/App3'
// //  import Aps from '../src/Todo/App4'
//   // import Aps from '../src/ComponentComposition/App5'
// import Aps from '../src/Form/App6'

// function App() {

//   return (
//     <>
     
      
//       <Aps/>
//     </>
//   )
// }

// export default App


// Import necessary dependencies
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';
import Register from './components/Register';
import HooksDemoApp from './components/hooks/hooksdemo';
// Create AuthContext for global state management using useContext hook
export const AuthContext = createContext();

function App() {
  // useState hook to manage authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Function to verify JWT token
  const verifyToken = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Context value containing state and functions
  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    // Provide auth context to all components
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <div className="App1">
        <div className="App">
          <Routes>
            {/* // Add this to your routes */}
            <Route path="/register" element={<Register />} />
            {/* Route for login page */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/profile" /> : <Login />
              } 
            />
            {/* Route for profile page */}
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/login" />
              } 
            />
            {/* Default route redirect */}
            <Route 
              path="/" 
              element={
                <Navigate to={isAuthenticated ? "/profile" : "/login"} />
              } 
            />
            {/* <Route 
              path="/hooks" 
              element={
                <Navigate to={"/hooks"} />
              } 
            /> */}
             <Route path="/hooks" element={<HooksDemoApp />} />
          </Routes>
        </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;