const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
      </div>
      <div className="user-info">
        <h2>{user.name || user.login}</h2>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <span>Followers: {user.followers}</span>
          <span>Following: {user.following}</span>
          <span>Repos: {user.public_repos}</span>
        </div>
        {user.blog && (
          <a href={user.blog} target="_blank" rel="noopener noreferrer" className="user-blog">
            {user.blog}
          </a>
        )}
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="github-link"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default UserCard;
