import { fetchFollowers } from './userService';
import mockData from './../mockUserData.json'; //fetchFellowers relies on mockdata, that's why it's not used at the test

describe('fetchFollowers Service', () => {
  it('correctly fetches direct followers for a given user', () => {
    const userId = 'A';
    const depth = 1;
    const expectedFollowerIds = ['B', 'C', 'D'];

    const followers = fetchFollowers(userId, depth, 1, new Set());

    // Verify the fetched followers match the expected direct followers
    expect(followers.map(f => f.id)).toEqual(expect.arrayContaining(expectedFollowerIds));
  });

  it('correctly fetches followers up to a given depth', () => {
    const userId = 'A';
    const depth = 2; // Fetch followers and their followers
    const expectedFollowerIdsDepth2 = ['B', 'C', 'D', 'E', 'K']; // Include second-level followers

    const followers = fetchFollowers(userId, depth, 1, new Set());

    // The result should include both direct followers and their followers
    expect(followers.map(f => f.id)).toEqual(expect.arrayContaining(expectedFollowerIdsDepth2));
  });

    // Test handling of non-existent user
    it('returns an empty array for a non-existent user', () => {
        const userId = 'NonExistent';
        const depth = 1;
        const results = fetchFollowers(userId, depth, 1, new Set(), mockData);
        expect(results).toEqual([]);
      });
});
