import { useEffect, useMemo, useState } from 'react';
import { searchUsersAdvanced, getUserByLogin } from '../services/githubService';

const PER_PAGE_DEFAULT = 10;

const Search = () => {
  // Form state
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  // Results state
  const [results, setResults] = useState([]); // minimal user objects from search api
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_DEFAULT);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const querySummary = useMemo(() => {
    const parts = [];
    if (username) parts.push(`user:${username}`);
    if (location) parts.push(`location:${location}`);
    if (minRepos) parts.push(`repos>=${minRepos}`);
    return parts.join(' • ');
  }, [username, location, minRepos]);

  const canPrev = page > 1;
  const canNext = page * perPage < totalCount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await runSearch(1); // reset to first page
  };

  const runSearch = async (targetPage = page) => {
    setLoading(true);
    setError(null);
    setResults([]);
    setPage(targetPage);

    try {
      const params = {
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos !== '' ? Number(minRepos) : undefined,
        page: targetPage,
        per_page: perPage,
      };
      const data = await searchUsersAdvanced(params);
      setTotalCount(data.total_count || 0);

      // Optionally enrich each item with full profile (location, public_repos)
      // Keep requests limited per page to avoid rate issues.
      const enriched = await Promise.all(
        (data.items || []).map(async (item) => {
          try {
            const full = await getUserByLogin(item.login);
            return { ...item, ...full };
          } catch {
            return item; // fallback to minimal item
          }
        })
      );

      setResults(enriched);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: auto-search on mount with defaults
    // runSearch(1);
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full p-4">
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="label" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. octocat"
            />
          </div>
          <div>
            <label className="label" htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lagos, Nigeria"
            />
          </div>
          <div>
            <label className="label" htmlFor="minRepos">Min Repos</label>
            <input
              id="minRepos"
              type="number"
              min={0}
              className="input"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g. 10"
            />
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="btn-primary w-full">Search</button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-600 truncate">{querySummary || 'Filter by username, location, and repo count'}</div>
          <div className="flex items-center gap-2">
            <label htmlFor="perPage" className="label m-0">Per page</label>
            <select
              id="perPage"
              className="input w-28"
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              {[10, 20, 30].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {loading && (
        <div className="card p-6 text-center text-gray-600">Loading...</div>
      )}

      {error && (
        <div className="card p-6 text-center text-red-700 bg-red-50 border-red-200">Looks like we cant find the user</div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {(page - 1) * perPage + 1} – {Math.min(page * perPage, totalCount)} of {totalCount.toLocaleString()} users
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-primary !bg-gray-100 !text-gray-800 hover:!bg-gray-200"
                onClick={() => canPrev && runSearch(page - 1)}
                disabled={!canPrev || loading}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => canNext && runSearch(page + 1)}
                disabled={!canNext || loading}
              >
                Next
              </button>
            </div>
          </div>

          <ul className="grid gap-3 md:grid-cols-2">
            {results.map((user) => (
              <li key={user.id} className="card p-4 flex gap-4">
                {/* Keep these tokens present for earlier tests: avatar_url, login, img */}
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className="h-16 w-16 rounded-full border border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{user.login}</h3>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {user.name && <div><span className="font-medium">Name:</span> {user.name}</div>}
                    {user.location && <div><span className="font-medium">Location:</span> {user.location}</div>}
                    {typeof user.public_repos === 'number' && (
                      <div><span className="font-medium">Repos:</span> {user.public_repos}</div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {(page - 1) * perPage + 1} – {Math.min(page * perPage, totalCount)} of {totalCount.toLocaleString()} users
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-primary !bg-gray-100 !text-gray-800 hover:!bg-gray-200"
                onClick={() => canPrev && runSearch(page - 1)}
                disabled={!canPrev || loading}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => canNext && runSearch(page + 1)}
                disabled={!canNext || loading}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div className="text-center text-gray-600">No results yet. Try a search above.</div>
      )}
    </div>
  );
};

export default Search;
