/**
 * The UserSearchForm.js component is designed to handle user inputs for searching within the Dashboard component.
 * It collects user data through form inputs, specifically for entering a username and specifying the depth of followers to fetch.
 * This component also includes validation logic to ensure that the inputs are correct before submitting the data.
 * Upon validation, it triggers a search operation using provided callback functions, allowing for dynamic fetching and display of user information based on the specified criteria.
 */

import React, { useState } from 'react';
import './UserSearchForm.css';

const UserSearchForm = ({ onValidSubmit, setDisplayedUsers  }) => {
  const [username, setUsername] = useState('');
  const [depth, setDepth] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const validateUsername = (username) => {
    if (!username.trim()) {
      setErrorMessage('Username cannot be empty.');
      setDisplayedUsers([]);
      return false;
    }
    return true;
  };

  const validateDepth = (depth) => {
    if (depth < 1 || isNaN(depth)) {
      setErrorMessage('Depth must be a positive integer.');
      setDisplayedUsers([]); // Clear any existing error messages upon successful validation
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUsername(username) && validateDepth(depth)) {
      onValidSubmit(username, depth);
      setErrorMessage(''); // Clear any existing error messages upon successful validation
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter user name"
      />
      <input 
        type="number" 
        value={depth} 
        onChange={(e) => setDepth(parseInt(e.target.value, 10))} 
        placeholder="Depth"
      />
      <button type="submit">Fetch Followers</button>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </form>
  );
};

export default UserSearchForm;