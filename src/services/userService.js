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
