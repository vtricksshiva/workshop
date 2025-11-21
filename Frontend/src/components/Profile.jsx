import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import ProfileCard from './ProfileCard';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API}/api/profile/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setUser(response.data.user);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>User Profile</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {isEditing ? (
        <div className="edit-profile-form">
          <h2>Edit Profiledd</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="form-input"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Profile Picture URL:</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter image URL"
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSave} className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)} className="submit-btn">
            Edit Profile
          </button>
          
          {/* Component Composition - Using ProfileCard component */}
          <div className="profile-card-container">
            <ProfileCard 
              name={user?.name} 
              bio={user?.bio} 
              profilePicture={user?.profilePicture}
              // Passing additional props for demonstration
              showEditButton={false}
            />

          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
