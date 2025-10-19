import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostsComponent from './components/PostsComponent'
import './App.css'

const queryClient = new QueryClient()

function App() {
  const [showPosts, setShowPosts] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 16 }}>
        <h1>React Query Demo - Posts</h1>

        <div style={{ marginBottom: 12 }}>
          <button onClick={() => setShowPosts((s) => !s)}>
            {showPosts ? 'Unmount Posts' : 'Mount Posts'}
          </button>
        </div>

        {showPosts && <PostsComponent />}
      </div>
    </QueryClientProvider>
  )
}

export default App
