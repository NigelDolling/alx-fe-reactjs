import SearchBar from './components/Search';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Find and explore GitHub profiles</p>
      </header>
      
      <main className="app-content">
        <SearchBar />
      </main>
      
      <footer className="app-footer">
        <p>Created with React & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
