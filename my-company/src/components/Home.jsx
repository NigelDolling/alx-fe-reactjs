import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      borderRadius: '8px',
      margin: '2rem 0'
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#1a237e',
        marginBottom: '1.5rem'
      }}>
        Welcome to Our Company
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#333',
        maxWidth: '800px',
        margin: '0 auto 2rem',
        lineHeight: '1.6'
      }}>
        We are dedicated to delivering excellence in all our services. Our team of experts is committed to providing innovative solutions tailored to your needs.
      </p>
      <Link
        to="/contact"
        style={{
          display: 'inline-block',
          backgroundColor: '#1a237e',
          color: 'white',
          padding: '0.8rem 2rem',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: '500',
          transition: 'background-color 0.3s, transform 0.2s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#0d47a1';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#1a237e';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Get Started
      </Link>
    </div>
  );
}

export default Home;
