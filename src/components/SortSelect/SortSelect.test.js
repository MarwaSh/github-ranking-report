import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SortSelect } from './SortSelect'; // Adjust the import path as needed

describe('SortSelect Component', () => {
  test('renders with correct options', () => {
    const { getByLabelText, getByRole } = render(<SortSelect sortCriteria="name" setSortCriteria={() => {}} />);
    
    expect(getByLabelText('Sort by:')).toBeInTheDocument();
    const select = getByRole('combobox');
    expect(select).toHaveValue('name'); // Check if the default value is correct
    
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(3); // Verify all options are rendered
    expect(options[0]).toHaveTextContent('Name');
    expect(options[1]).toHaveTextContent('Creation Date');
    expect(options[2]).toHaveTextContent('Followers Rank');
  });

  test('calls setSortCriteria with the new value when changed', () => {
    const mockSetSortCriteria = jest.fn();
    const { getByRole } = render(<SortSelect sortCriteria="name" setSortCriteria={mockSetSortCriteria} />);
    
    fireEvent.change(getByRole('combobox'), { target: { value: 'creationDate' } });
    expect(mockSetSortCriteria).toHaveBeenCalledWith('creationDate');
  });
});
