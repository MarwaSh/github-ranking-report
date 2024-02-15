/**
 * PaginationControl Component
 * This component generates a navigable pagination bar to enable users to switch between pages
 * of content (e.g., users, posts, etc.). It calculates the number of pages based on the total
 * number of items and the specified number of items per page. Clicking on a page number triggers
 * a function to update the current page state in the parent component.
  * The component uses an array to store the calculated page numbers based on `totalUsers` and
 * `usersPerPage`. It maps over this array to render a list of page numbers, marking the current
 * page as active using conditional class assignment. Each page number is a clickable element that
 * prevents the default anchor behavior and calls the `paginate` function passed via props with the
 * number of the page to display.
 */
 
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
  
  