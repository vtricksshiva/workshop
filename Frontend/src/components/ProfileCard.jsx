// import React from 'react';

// // ProfileCard component demonstrating props and component composition
// const ProfileCard = ({ 
//   name = 'Anonymous', 
//   bio = 'No bio provided', 
//   profilePicture, 
//   showEditButton = true,
//   onEditClick,
//   children // For component composition
// }) => {
//   // Default profile picture if none provided
//   const defaultProfilePic = 'https://media.geeksforgeeks.org/wp-content/uploads/20240501164842/React-19-New-features-and-Updates.webp';
  
//   return (
//     <div className="profile-card">
//       {/* Profile Picture */}
//       <div className="profile-picture-container">
//         <img 
//           src={profilePicture || defaultProfilePic} 
//           alt={`${name}'s profile`}
//           className="profile-picture"
//           onError={(e) => {
//             e.target.src = defaultProfilePic;
//           }}
//         />
//       </div>
      
//       {/* User Information */}
//       <div className="profile-info">
//         <h2 className="profile-name">{name}</h2>
//         <p className="profile-bio">{bio}</p>
//       </div>

//       {/* Edit Button (conditional rendering based on props) */}
//       {showEditButton && onEditClick && (
//         <button 
//           className="edit-profile-btn"
//           onClick={onEditClick}
//         >
//           Edit Profile
//         </button>
//       )}

//       {/* Component Composition - render children if provided */}
//       {children && (
//         <div className="profile-card-children">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileCard;

import React from 'react';
import './ProfileCard.css'; // Import the CSS

// ProfileCard component demonstrating props and component composition
const ProfileCard = ({ 
  name = 'Anonymous', 
  bio = 'No bio provided', 
  profilePicture, 
  showEditButton = true,
  onEditClick,
  children, // For component composition
  theme = 'blue' // Added theme prop for different color schemes
}) => {
  // Default profile picture if none provided
  const defaultProfilePic = 'https://media.geeksforgeeks.org/wp-content/uploads/20240501164842/React-19-New-features-and-Updates.webp';
  
  return (
    <div className={`profile-card ${theme}-theme`}>
      {/* Profile Picture */}
      <div className="profile-picture-container">
        <img 
          src={profilePicture || defaultProfilePic} 
          alt={`${name}'s profile`}
          className="profile-picture"
          onError={(e) => {
            e.target.src = defaultProfilePic;
          }}
        />
      </div>
      
      {/* User Information */}
      <div className="profile-info">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-bio">{bio}</p>
      </div>

      {/* Edit Button (conditional rendering based on props) */}
      {showEditButton && onEditClick && (
        <button 
          className="edit-profile-btn"
          onClick={onEditClick}
        >
          Edit Profile
        </button>
      )}

      {/* Component Composition - render children if provided */}
      {children && (
        <div className="profile-card-children">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;