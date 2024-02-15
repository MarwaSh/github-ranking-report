/** 
 * The fetchFollowers function recursively fetches followers for a given user up to a specified depth, preventing loops by tracking visited users.
 *  It takes a userId and depth to determine how far to traverse follower relationships, using currentDepth and visited to manage recursion and avoid repeats.
 *  Followers are fetched from a mock data source (mockData), and the function aggregates followers of followers up to the given depth, filtering out any undefined users to ensure only valid data is returned.
 *  This service is useful for simulating the behavior of fetching user relationships in applications where actual network requests are not feasible or desired, such as in testing or prototyping phases.
 * 
 **/

import mockData from './../mockUserData.json';

const fetchFollowers = (userId, depth, currentDepth = 1, visited = new Set()) => {
  if (currentDepth > depth || visited.has(userId)) return [];
  visited.add(userId);

  const user = mockData.find(u => u.id === userId);
  if (!user) return [];

  const followers = user.followers
    .map(followerId => mockData.find(u => u.id === followerId))
    .filter(Boolean); // Filter out undefined results in case of missing users

  const followersOfFollowers = followers.flatMap(follower =>
    fetchFollowers(follower.id, depth, currentDepth + 1, visited)
  );

  return [...followers, ...followersOfFollowers];
};

export { fetchFollowers };
