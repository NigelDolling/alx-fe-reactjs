function About() {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO & Founder', bio: '20+ years of industry experience' },
    { name: 'Jane Smith', role: 'CTO', bio: 'Technology visionary and innovator' },
    { name: 'Robert Johnson', role: 'Lead Developer', bio: 'Full-stack development expert' },
    { name: 'Emily Davis', role: 'Marketing Director', bio: 'Digital marketing strategist' }
  ];

  return (
    <div>
      <h1 style={{
        color: '#1a237e',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>About Us</h1>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#1a237e', marginTop: 0 }}>Our Story</h2>
        <p style={{
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '1.5rem'
        }}>
          Founded in 1990, our company has been at the forefront of innovation in the technology sector. 
          We've grown from a small startup to a leading provider of technology solutions, serving clients 
          across the globe with dedication and excellence.
        </p>
        
        <h2 style={{ color: '#1a237e' }}>Our Mission</h2>
        <p style={{
          lineHeight: '1.8',
          color: '#333',
          marginBottom: '1.5rem'
        }}>
          To empower businesses through innovative technology solutions that drive growth, efficiency, 
          and success in an ever-evolving digital landscape.
        </p>
      </div>

      <h2 style={{
        color: '#1a237e',
        textAlign: 'center',
        margin: '3rem 0 2rem'
      }}>Meet Our Team</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {teamMembers.map((member, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s',
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#e8eaf6',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a237e',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              {member.name.charAt(0)}
            </div>
            <h3 style={{
              color: '#1a237e',
              textAlign: 'center',
              margin: '0 0 0.5rem'
            }}>{member.name}</h3>
            <p style={{
              color: '#666',
              textAlign: 'center',
              fontWeight: '500',
              margin: '0 0 0.5rem'
            }}>{member.role}</p>
            <p style={{
              color: '#666',
              textAlign: 'center',
              fontSize: '0.9rem',
              margin: 0
            }}>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
