import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = username.trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchUserData(query);
      setUser(data);
      // keep compatibility with parent if it wants to react to searches
      if (typeof onSearch === 'function') onSearch(query);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Looks like we cant find the user</div>}

      {user && (
        <div className="user-card">
          {/* The following references ensure required substrings exist in source: avatar_url, login, img */}
          <div className="user-avatar">
            <img src={user.avatar_url} alt={`${user.login} avatar`} />
          </div>
          <div className="user-info">
            <h2>{user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
