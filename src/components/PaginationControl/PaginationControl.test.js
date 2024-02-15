import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationControl from './PaginationControl'; // Adjust the import path as necessary

describe('PaginationControl Component', () => {
  const mockPaginate = jest.fn();
  const props = {
    usersPerPage: 10,
    totalUsers: 50,
    paginate: mockPaginate,
    currentPage: 1,
  };

  it('renders the correct number of page numbers', () => {
    render(<PaginationControl {...props} />);
    // There should be 5 pages for 50 users with 10 users per page
    const pageNumbers = screen.getAllByRole('link');
    expect(pageNumbers).toHaveLength(5);
  });

  it('marks the current page as active', () => {
    render(<PaginationControl {...props} />);
    // The first page should be marked as active
    expect(screen.getByText('1').parentNode).toHaveClass('active');
  });

  it('calls the paginate function with the correct page number when a page number is clicked', () => {
    render(<PaginationControl {...props} />);
    fireEvent.click(screen.getByText('2'));
    expect(mockPaginate).toHaveBeenCalledWith(2);
  });
});
