import { useState } from 'react';
import { searchUser } from './services/githubService';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await searchUser(username);
      setUser(userData);
    } catch (err) {
      setError('User not found. Please try another username.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Find and explore GitHub profiles</p>
      </header>
      
      <main className="app-content">
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {user && <UserCard user={user} />}
      </main>
      
      <footer className="app-footer">
        <p>Created with React & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
