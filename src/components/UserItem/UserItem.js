/**
 * UserItem Component
 * A presentational component that displays a user's avatar, name, profile creation date,
 * and followers rank. The user's name is a clickable link that opens their profile in a new tab.
 * The component assumes that all necessary user information is passed through the `user` prop.
 * It renders the user's avatar as an image, their name as a link to their profile (which opens in a new tab),
 * and additional information about their profile creation date and followers rank in a stylized manner.
 **/

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
