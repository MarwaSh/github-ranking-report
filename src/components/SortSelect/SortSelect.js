import React from 'react';

const SortSelect = ({ sortCriteria, setSortCriteria }) => {
  return (
    <div className="sort-container">
      <label htmlFor="sortSelect" className="sort-label">Sort by:</label>
      <select id="sortSelect" className="sort-select" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
        <option value="name">Name</option>
        <option value="creationDate">Creation Date</option>
        <option value="followersRank">Followers Rank</option>
      </select>
    </div>
  );
};

export { SortSelect };
