import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      textAlign: 'center',
      margin: '2rem auto',
      padding: '2rem',
      maxWidth: '400px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{
        color: '#1a237e',
        marginTop: '0',
        marginBottom: '1.5rem'
      }}>Counter App</h2>
      
      <p style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '1.5rem 0',
        color: '#1a237e'
      }}>
        Current Count: <span style={{ color: count > 0 ? '#2e7d32' : count < 0 ? '#c62828' : '#1a237e' }}>{count}</span>
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            minWidth: '100px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#b71c1c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#d32f2f'}
        >
          Decrement
        </button>
        
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#616161',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            minWidth: '100px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#424242'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#616161'}
        >
          Reset
        </button>
        
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#388e3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            minWidth: '100px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2e7d32'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#388e3c'}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default Counter;
