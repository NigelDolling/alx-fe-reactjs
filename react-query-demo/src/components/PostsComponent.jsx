import { useQuery } from '@tanstack/react-query'

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

function PostsComponent() {
  const { data, error, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60, // 1 minute fresh
    gcTime: 1000 * 60 * 5, // 5 minutes cache (v5: gcTime replaces cacheTime)
    refetchOnWindowFocus: true,
  })

  if (isLoading) return <p>Loading posts...</p>
  if (isError) return <p style={{ color: 'red' }}>Error: {error.message}</p>

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => refetch()}>Refetch Posts</button>
        <span style={{ marginLeft: 8, fontStyle: 'italic' }}>
          {isFetching ? 'Updating in background...' : 'Idle'}
        </span>
      </div>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <div style={{ color: '#666' }}>{post.body}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsComponent
