/**
 * The Dashboard.js serves as the primary interface for displaying and managing user information and their followers.
 * It facilitates user search by name, controls the depth of follower information displayed, and dynamically fetches and displays follower data.
 * The component includes pagination for navigating through the list of followers and sorting functionality to order the displayed users by criteria such as name, creation date, or followers rank.
 * It uses React's useState for state management and useEffect for initial data setup, integrating closely with UserSearchForm, UserItem, SortedSelection and PaginationControl components for a comprehensive user experience.
 */

import React, { useState, useEffect } from 'react';
import UserSearchForm from './../UserSearchForm/UserSearchForm'; 
import UserItem from './../UserItem/UserItem';
import PaginationControl from './../PaginationControl/PaginationControl';
import { SortSelect } from './../SortSelect/SortSelect';
import mockData from './../../mockUserData.json';
import { fetchFollowers } from '../../services/userService';
import './Dashboard.css';

const Dashboard = () => {
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Initial data fetch or setup
  }, []);

  useEffect(() => {
    // Apply sorting every time sortCriteria or displayedUsers changes
    setDisplayedUsers(prevUsers => sortUsers([...prevUsers]));
  }, [sortCriteria]); // Add displayedUsers to dependencies if dynamic fetching is implemented


  const handleValidSubmit = (username, depth) => {
    const user = mockData.find(user => user.name.toLowerCase().includes(username.toLowerCase()));
    if (user) {
      const uniqueFollowers = fetchFollowers(user.id, depth);
      const unique = Array.from(new Set(uniqueFollowers.map(f => f.id)))
        .map(id => uniqueFollowers.find(f => f.id === id));
      setDisplayedUsers(unique);
      setCurrentPage(1); // Reset to first page for new search results
      setErrorMessage('');
    } else {
      setDisplayedUsers([]);
      setErrorMessage("Please enter a valid username to show its followers");
    }
  };

  const sortUsers = (users) => {
    switch (sortCriteria) {
      case 'name':
        return users.sort((a, b) => a.name.localeCompare(b.name));
      case 'creationDate':
        return users.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
      case 'followersRank':
        return users.sort((a, b) => a.followersRank - b.followersRank);
      default:
        return users; // Return unsorted if no matching criteria
    }
  };
  

  return (
    <div className="dashboard">
      <UserSearchForm onValidSubmit={handleValidSubmit} setDisplayedUsers={setDisplayedUsers} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <SortSelect sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
      <div className="user-list">
        {displayedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      <PaginationControl
        usersPerPage={usersPerPage}
        totalUsers={displayedUsers.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Dashboard;