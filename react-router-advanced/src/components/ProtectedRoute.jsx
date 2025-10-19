import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ authed }) {
  return authed ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute