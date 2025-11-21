// Import React hooks
import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import './Login.css'; // External CSS
const API = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  // useContext hook to access global authentication state
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  
  // useState hooks for form state management
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // useRef hook for focusing on email input
  const emailInputRef = useRef(null);

  // Focus on email input when component mounts
  React.useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  // Input sanitization function
  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const isValidPassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };

  // Real-time validation on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation
    if (name === 'email' && sanitizedValue && !isValidEmail(sanitizedValue)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
    }

    if (name === 'password' && sanitizedValue && !isValidPassword(sanitizedValue)) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters long'
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    let validationErrors = {};
    
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    // If validation errors exist, set them and prevent submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // API call to login
      const response = await axios.post(`${API}/api/auth/login`, formData);
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Update global state
      setIsAuthenticated(true);
      setUser(response.data.user);
      
      // Log successful submission
      console.log('Login successful:', response.data.user);
      
    } catch (error) {
      // Handle login errors
      setErrors({
        general: error.response?.data?.message || 'Login failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid for submission
  const isFormValid = formData.email && 
                     formData.password && 
                     isValidEmail(formData.email) && 
                     isValidPassword(formData.password) && 
                     !isSubmitting;

  return (
    <div className="login-container">
      {/* Internal CSS example */}
      <style>
        {`
          .login-header {
            text-align: center;
            // color: #333;
            color: #000;
            margin-bottom: 30px;
            font-size: 2rem;
          }
        `}
      </style>
      
      <div className="form-container">
        <h2 className="login-header">Login</h2>
        
        {errors.general && (
          <div className="error-message" style={{ /* Inline CSS */
            backgroundColor: '#f8d7da', 
            color: '#2d721cff', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'invalid' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'invalid' : ''}`}
              placeholder="Enter your password"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
<div style={{ textAlign: 'center', marginTop: '20px' }}>
  <p>Don't have an account? 
    <a 
      href="/register" 
      style={{ 
        color: '#007bff', 
        textDecoration: 'none', 
        marginLeft: '5px',
        cursor: 'pointer'
      }}
      onClick={(e) => {
        e.preventDefault();
        // Navigate to register page - adjust based on your routing
        window.location.href = '/register';
      }}
    >
      Register here
    </a>
  </p>
</div>
          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!isFormValid}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
