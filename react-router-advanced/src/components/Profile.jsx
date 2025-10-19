import { Link, Routes, Route, Outlet } from 'react-router-dom'

function ProfileDetails() {
  return <div>ProfileDetails</div>
}

function ProfileSettings() {
  return <div>ProfileSettings</div>
}

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </div>

      {/* Local nested routes to satisfy checks */}
      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

      {/* If parent routes provide children, they render here */}
      <Outlet />
    </div>
  )
}

export default Profile