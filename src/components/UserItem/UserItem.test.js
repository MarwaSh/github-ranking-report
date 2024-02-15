import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserItem from './UserItem';
import mockData from './../../mockUserData.json';

const testUser = mockData[0]; // Use the first user in the mock data for simplicity

describe('UserItem Component with mockData', () => {
  it('renders user information correctly using mockData', () => {
    render(<UserItem user={testUser} />);

    // Verify that the component renders the user's details correctly
    expect(screen.getByText(testUser.name)).toBeInTheDocument();
    expect(screen.getByText(`Profile Created: ${testUser.creationDate}`)).toBeInTheDocument();
    expect(screen.getByText(`Followers Rank: ${testUser.followersRank}`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', testUser.avatar);
    expect(screen.getByRole('link')).toHaveAttribute('href', testUser.profileLink);
  });
});
