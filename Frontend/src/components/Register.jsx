import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import './Login.css';

const Register = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const nameInputRef = useRef(null);

  React.useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

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

    if (name === 'confirmPassword' && sanitizedValue && !passwordsMatch(formData.password, sanitizedValue)) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
    }

    if (name === 'password' && formData.confirmPassword && !passwordsMatch(sanitizedValue, formData.confirmPassword)) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let validationErrors = {};
    
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

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

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password';
    } else if (!passwordsMatch(formData.password, formData.confirmPassword)) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await axios.post('http://localhost:5000/api/auth/register', registerData);
      
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      console.log('Registration successful:', response.data.user);
      
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name &&
                     formData.email && 
                     formData.password && 
                     formData.confirmPassword &&
                     isValidEmail(formData.email) && 
                     isValidPassword(formData.password) && 
                     passwordsMatch(formData.password, formData.confirmPassword) &&
                     !isSubmitting;

  return (
    <div className="login-container">
      <style>
        {`
          .login-header {
            text-align: center;
            color: #000;
            margin-bottom: 30px;
            font-size: 2rem;
          }
        `}
      </style>
      
      <div className="form-container">
        <h2 className="login-header">Register</h2>
        
        {errors.general && (
          <div className="error-message" style={{
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'invalid' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
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
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'invalid' : ''}`}
              placeholder="Confirm your password"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={!isFormValid}
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Already have an account? 
              <a 
                href="/login" 
                style={{ 
                  color: '#007bff', 
                  textDecoration: 'none', 
                  marginLeft: '5px',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/login';
                }}
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;