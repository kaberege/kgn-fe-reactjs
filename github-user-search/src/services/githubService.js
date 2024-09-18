import axios from 'axios';
/*
export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  console.log(response)
  return response.data;
};
*/

const GITHUB_API_URL = 'https://api.github.com/search/users';

export const fetchUserData = async (username, location, minRepos) => {
    const query = [];
    if (username) query.push(`${username}`);
    if (location) query.push(`location:${location}`);
    if (minRepos) query.push(`repos:>=${minRepos}`);

    const response = await axios.get(`${GITHUB_API_URL}?q=${query.join('+')}`);
    console.log(response.data)
    console.log(response.data.items)
    return response.data.items;
};
