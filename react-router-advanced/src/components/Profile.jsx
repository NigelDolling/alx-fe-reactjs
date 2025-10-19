import { Link, Outlet } from 'react-router-dom'

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Profile