function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies to meet your business needs.',
      icon: '🌐'
    },
    {
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications for iOS and Android that deliver seamless user experiences.',
      icon: '📱'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces designed to enhance user engagement and satisfaction.',
      icon: '🎨'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and services to power your digital transformation.',
      icon: '☁️'
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence and reach.',
      icon: '📈'
    },
    {
      title: 'Consulting',
      description: 'Expert guidance and strategic planning to help your business leverage technology effectively.',
      icon: '💡'
    }
  ];

  return (
    <div>
      <h1 style={{
        color: '#1a237e',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>Our Services</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {service.icon}
            </div>
            <h3 style={{
              color: '#1a237e',
              margin: '0 0 1rem',
              textAlign: 'center'
            }}>
              {service.title}
            </h3>
            <p style={{
              color: '#555',
              lineHeight: '1.6',
              margin: 0
            }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
      
      <div style={{
        backgroundColor: '#e8eaf6',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <h2 style={{
          color: '#1a237e',
          marginTop: 0
        }}>Ready to get started?</h2>
        <p style={{
          margin: '0.5rem 0 1.5rem',
          color: '#333',
          fontSize: '1.1rem'
        }}>
          Contact us today to discuss how we can help with your project.
        </p>
        <a href="/contact" style={{
          display: 'inline-block',
          backgroundColor: '#1a237e',
          color: 'white',
          textDecoration: 'none',
          padding: '0.8rem 2rem',
          borderRadius: '4px',
          fontWeight: '500',
          transition: 'background-color 0.3s',
          ':hover': {
            backgroundColor: '#0d47a1'
          }
        }}>
          Get in Touch
        </a>
      </div>
    </div>
  );
}

export default Services;
