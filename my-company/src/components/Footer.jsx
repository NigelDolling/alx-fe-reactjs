function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📷' }
  ];

  return (
    <footer style={{
      backgroundColor: '#1a237e',
      color: 'white',
      padding: '2rem 0',
      marginTop: '3rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h3 style={{
            color: 'white',
            marginTop: 0,
            marginBottom: '1rem',
            fontSize: '1.25rem'
          }}>Company Name</h3>
          <p style={{
            color: '#e8eaf6',
            lineHeight: '1.6',
            margin: 0
          }}>
            Delivering innovative solutions to help businesses thrive in the digital age.
          </p>
        </div>
        
        <div>
          <h4 style={{
            color: 'white',
            marginTop: 0,
            marginBottom: '1rem',
            fontSize: '1.1rem'
          }}>Quick Links</h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'Contact', path: '/contact' }
            ].map((link, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <a 
                  href={link.path}
                  style={{
                    color: '#e8eaf6',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    ':hover': {
                      color: 'white',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 style={{
            color: 'white',
            marginTop: 0,
            marginBottom: '1rem',
            fontSize: '1.1rem'
          }}>Connect With Us</h4>
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  transition: 'background-color 0.3s, transform 0.3s',
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px)'
                  }
                }}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p style={{
            color: '#e8eaf6',
            margin: '0.5rem 0 0',
            fontSize: '0.9rem'
          }}>
            Email: info@company.com
          </p>
          <p style={{
            color: '#e8eaf6',
            margin: '0.5rem 0 0',
            fontSize: '0.9rem'
          }}>
            Phone: +1 (123) 456-7890
          </p>
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#e8eaf6',
          margin: 0,
          fontSize: '0.9rem'
        }}>
          &copy; {currentYear} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
