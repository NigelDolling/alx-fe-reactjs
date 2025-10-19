import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, useParams } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function Layout() {
  const { authed, toggle } = useAuth()
  return (
    <div style={{ padding: 16 }}>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/posts/1">Post 1</Link>
        <button onClick={toggle}>{authed ? 'Logout' : 'Login'}</button>
      </nav>
      <Outlet />
    </div>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function ProtectedRoute() {
  const { authed } = useAuth()
  return authed ? <Outlet /> : <Navigate to="/" replace />
}

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

function ProfileDetails() {
  return <div>ProfileDetails</div>
}

function ProfileSettings() {
  return <div>ProfileSettings</div>
}

function Post() {
  const { postId } = useParams()
  return (
    <div>
      <h2>Post {postId}</h2>
    </div>
  )
}

function BlogPost() {
  const { id } = useParams()
  return (
    <div>
      <h2>BlogPost {id}</h2>
    </div>
  )
}

function NotFound() {
  return <h2>Not Found</h2>
}

function App() {
  const [authed, setAuthed] = useState(false)
  const toggle = () => setAuthed((a) => !a)
  const authValue = { authed, toggle }

  return (
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="posts/:postId" element={<Post />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />}>
              <Route index element={<ProfileDetails />} />
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
