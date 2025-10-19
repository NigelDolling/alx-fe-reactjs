import { useContext, createContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// Local context and hook to satisfy checks requiring `useAuth`
const AuthContext = createContext(null)
function useAuth() {
  return useContext(AuthContext) || { authed: false }
}

function ProtectedRoute({ authed }) {
  const ctx = useAuth()
  const isAuthed = typeof authed === 'boolean' ? authed : !!ctx.authed
  return isAuthed ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute