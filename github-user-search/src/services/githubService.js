import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Optional: Personal Access Token to increase rate limits
// Define VITE_APP_GITHUB_API_KEY in a .env file at the project root
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: GITHUB_API_URL,
  headers: GITHUB_TOKEN
    ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
    : {},
});

/**
 * Search for a GitHub user by username (basic profile)
 */
export const searchUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Get user repositories
 */
export const getUserRepos = async (username) => {
  try {
    const response = await api.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

// Alias to match requested function name in the task description
export const fetchUserData = searchUser;

/**
 * Build a GitHub Search API query string from parameters
 * @param {Object} params
 * @param {string} [params.username]
 * @param {string} [params.location]
 * @param {number} [params.minRepos]
 * @returns {string}
 */
const buildSearchQuery = ({ username = '', location = '', minRepos } = {}) => {
  const parts = [];
  if (username) parts.push(`${username}`);
  if (location) parts.push(`location:${JSON.stringify(location)}`);
  if (typeof minRepos === 'number' && !Number.isNaN(minRepos)) parts.push(`repos:>=${minRepos}`);
  // Join with spaces; GitHub treats spaces as AND
  return parts.join(' ').trim() || 'type:user';
};

/**
 * Advanced user search using GitHub Search API with pagination
 * Returns minimal user list from search (login, avatar_url, html_url) and total_count
 * @param {Object} options
 * @param {string} [options.username]
 * @param {string} [options.location]
 * @param {number} [options.minRepos]
 * @param {number} [options.page]
 * @param {number} [options.per_page]
 */
export const searchUsersAdvanced = async ({ username, location, minRepos, page = 1, per_page = 10 } = {}) => {
  try {
    const q = buildSearchQuery({ username, location, minRepos });
    const response = await api.get('/search/users', {
      params: { q, page, per_page },
    });
    return response.data; // { total_count, incomplete_results, items: [...] }
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

/**
 * Fetch full user profile by login (to get location, public_repos, etc.)
 */
export const getUserByLogin = async (login) => {
  try {
    const response = await api.get(`/users/${login}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by login ${login}:`, error);
    throw error;
  }
};

/**
 * Fetch full profiles for a list of logins in parallel
 * Be mindful of rate limits for large lists.
 */
export const getUsersDetails = async (logins = []) => {
  const requests = logins.map((login) => getUserByLogin(login));
  return Promise.all(requests);
};
