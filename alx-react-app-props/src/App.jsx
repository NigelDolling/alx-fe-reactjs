import { useState } from 'react'
import './App.css'
import UserProfile from './components/UserProfile'
import WelcomeMessage from './components/WelcomeMessage'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import ProfilePage from './components/UserProfile'
import { UserContext } from './context/UserContext'

function App() {
  const [count, setCount] = useState(0)
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" }

  return (
    <UserContext.Provider value={userData}>
      <div className="app">
        <Header />
        <MainContent>
          <WelcomeMessage />
          <ProfilePage />
        </MainContent>
        <Footer />
      </div>
    </UserContext.Provider>
  )
}

export default App
