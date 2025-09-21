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
 * Search for a GitHub user by username
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} - User data from GitHub API
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
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - Array of user repositories
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
