import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserSearchForm from './UserSearchForm';

describe('UserSearchForm Component', () => {
  test('renders input fields and submit button', () => {
    const { getByPlaceholderText, getByText } = render(
      <UserSearchForm setDisplayedUsers={() => {}} />
    );
    expect(getByPlaceholderText('Enter user name')).toBeInTheDocument();
    expect(getByPlaceholderText('Depth')).toBeInTheDocument();
    expect(getByText('Fetch Followers')).toBeInTheDocument();
  });

  test('validates empty username', async () => {
    const mockSubmit = jest.fn();
    const { getByText, findByText } = render(
      <UserSearchForm onValidSubmit={mockSubmit} setDisplayedUsers={() => {}} />
    );
    fireEvent.click(getByText('Fetch Followers'));

    expect(mockSubmit).not.toHaveBeenCalled();
    // If the error message appears asynchronously, use findByText instead.
    expect(await findByText('Username cannot be empty.')).toBeInTheDocument();
  });

  test('validates non-positive integer depth', async () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText, findByText } = render(
      <UserSearchForm onValidSubmit={mockSubmit} setDisplayedUsers={() => {}} />
    );
    fireEvent.change(getByPlaceholderText('Enter user name'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Depth'), { target: { value: '0' } });
    fireEvent.click(getByText('Fetch Followers'));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(await findByText('Depth must be a positive integer.')).toBeInTheDocument();
  });

  test('submits valid username and depth', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <UserSearchForm onValidSubmit={mockSubmit} setDisplayedUsers={() => {}} />
    );
    fireEvent.change(getByPlaceholderText('Enter user name'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Depth'), { target: { value: '3' } });
    fireEvent.click(getByText('Fetch Followers'));
    
    expect(mockSubmit).toHaveBeenCalledWith('testuser', 3);
  });
});
