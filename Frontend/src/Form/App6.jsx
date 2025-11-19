import React, { useState } from 'react';
import './App.css';

const Form = () => {
  // State to manage form fields and validation errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the current field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Function to handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Function to validate password length
  const isValidPassword = (password) => {
    return password.length >= 6; // For example, minimum 6 characters
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    let validationErrors = { name: '', email: '', password: '' };
    let isValid = true;

    // Validate name
    if (formData.name === '') {
      validationErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    if (formData.email === '') {
      validationErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate password
    if (formData.password === '') {
      validationErrors.password = 'Password is required';
      isValid = false;
    } else if (!isValidPassword(formData.password)) {
      validationErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Set errors if validation fails
    setErrors(validationErrors);

    // If form is valid, log the data (or submit it)
    if (isValid) {
      console.log('Form submitted successfully:', formData);
      alert('Form submitted successfully');
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'invalid' : ''}`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
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
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'invalid' : ''}`}
            placeholder="Enter your password"
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={Object.values(errors).some((error) => error !== '')}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;