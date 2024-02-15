import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard'; // Adjust the path as needed

describe('Dashboard Component', () => {
  test('renders without crashing', () => {
    render(<Dashboard />);
    expect(screen.getByText('Fetch Followers')).toBeInTheDocument();
  });

  // Example of a functionality test
  test('updates displayed users based on search criteria', async () => {
    // Mock the fetchFollowers function or ensure it uses mock data
    render(<Dashboard />);
    fireEvent.change(screen.getByPlaceholderText('Enter user name'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText('Fetch Followers'));
  });
});