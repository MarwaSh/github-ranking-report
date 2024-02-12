import React from 'react';
import './PaginationControl.css';

const PaginationControl = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={(e) => {e.preventDefault(); paginate(number);}} href='#!' className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  export default PaginationControl;
  
  