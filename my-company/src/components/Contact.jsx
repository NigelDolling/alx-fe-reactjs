import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }, 1000);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{
        color: '#1a237e',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>Contact Us</h1>
      
      {submitStatus === 'success' && (
        <div style={{
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="name" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.name ? '#d32f2f' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#1a237e',
                  boxShadow: '0 0 0 2px rgba(26, 35, 126, 0.2)'
                }
              }}
              placeholder="Your name"
            />
            {errors.name && (
              <p style={{ color: '#d32f2f', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                {errors.name}
              </p>
            )}
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.email ? '#d32f2f' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#1a237e',
                  boxShadow: '0 0 0 2px rgba(26, 35, 126, 0.2)'
                }
              }}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p style={{ color: '#d32f2f', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                {errors.email}
              </p>
            )}
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="message" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.message ? '#d32f2f' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                resize: 'vertical',
                minHeight: '120px',
                transition: 'border-color 0.3s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#1a237e',
                  boxShadow: '0 0 0 2px rgba(26, 35, 126, 0.2)'
                }
              }}
              placeholder="Your message..."
            ></textarea>
            {errors.message && (
              <p style={{ color: '#d32f2f', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                {errors.message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? '#9fa8da' : '#1a237e',
              color: 'white',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              width: '100%',
              transition: 'background-color 0.3s',
              ':hover': !isSubmitting ? {
                backgroundColor: '#0d47a1'
              } : {}
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      
      <div style={{
        marginTop: '3rem',
        backgroundColor: '#e8eaf6',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#1a237e',
          marginTop: 0,
          marginBottom: '1rem'
        }}>Visit Us</h2>
        <p style={{ margin: '0.5rem 0', color: '#333' }}>
          <strong>Address:</strong> 123 Business Street, City, Country
        </p>
        <p style={{ margin: '0.5rem 0', color: '#333' }}>
          <strong>Phone:</strong> +1 (123) 456-7890
        </p>
        <p style={{ margin: '0.5rem 0 0', color: '#333' }}>
          <strong>Email:</strong> info@company.com
        </p>
      </div>
    </div>
  );
}

export default Contact;
