import React from 'react';
import './UserItem.css'; 

const UserItem = ({ user }) => {
  return (
    <div className="user-item">
      <img src={user.avatar} alt={`Avatar of ${user.name}`} className="user-avatar" />
      <div className="user-details">
        <a href={user.profileLink} target="_blank" rel="noopener noreferrer" className="user-name">
          {user.name}
        </a>
        <p className="user-info">Profile Created: {user.creationDate}</p>
        <p className="user-info">Followers Rank: {user.followersRank}</p>
      </div>
    </div>
  );
};

export default UserItem;
