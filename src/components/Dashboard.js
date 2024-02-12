import React, { useState, useEffect } from 'react';
import UserItem from './UserItem';
import PaginationControl from './PaginationControl/PaginationControl';
import mockData from './../mockUserData.json';
import { fetchFollowers } from './../services/userService';
import './Dashboard.css';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [depth, setDepth] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [sortCriteria, setSortCriteria] = useState('name'); // Default sorting by name
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    fetch('./../mockUserData.json')
      .then(response => response.json())
      .then(data => setDisplayedUsers(data));
  }, []);
  

  const handleFetchClick = () => {
    const user = mockData.find(user => user.name.toLowerCase().includes(username.toLowerCase()));
    if (user) {
      setErrorMessage('');
      const uniqueFollowers = fetchFollowers(user.id, depth);
      // Remove duplicate followers based on their IDs
      const unique = Array.from(new Set(uniqueFollowers.map(f => f.id)))
        .map(id => uniqueFollowers.find(f => f.id === id));
      setDisplayedUsers(unique);
    } else {
      setDisplayedUsers([]);
      setErrorMessage("Please enter valid userName in order to show it's followers");
    }
  };

  const sortUsers = (users) => {
    return users.sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === 'creationDate') {
        return new Date(a.creationDate) - new Date(b.creationDate);
      } else if (sortCriteria === 'followersRank') {
        return a.followersRank - b.followersRank;
      }
    });
  };


  // Calculate the indices of the first and last followers on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const sortedUsers = sortUsers(displayedUsers);
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

// Change Page Function
const paginate = pageNumber => setCurrentPage(pageNumber);

return (
  <div className="dashboard">
    <div className="form-group">
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter user name"
        className="text-input" // Ensure this class is defined in your CSS for styling the text input
      />
      <input 
        type="number" 
        value={depth} 
        onChange={(e) => setDepth(parseInt(e.target.value, 10))} 
        placeholder="Depth"
        className="number-input" // Ensure this class is defined in your CSS for styling the number input
      />
      <button onClick={handleFetchClick}>Fetch Followers</button>
      <div class="error-message">{errorMessage}</div>
    </div>
    
    <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)} className="sort-select">
      <option value="name">Name</option>
      <option value="creationDate">Creation Date</option>
      <option value="followersRank">Followers Rank</option>
    </select>

    <div className="user-list">
      {currentUsers.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>

    <PaginationControl
      usersPerPage={usersPerPage}
      totalUsers={displayedUsers.length}
      paginate={paginate}
      currentPage={currentPage}
      className="pagination-control"
    />
  </div>
);
};

export default Dashboard;
