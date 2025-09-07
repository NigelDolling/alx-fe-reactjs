import React from 'react';

const UserProfile = (props) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px auto',
      maxWidth: '500px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff'
    }}>
      <h2 style={{
        color: '#1a237e',
        marginTop: '0',
        borderBottom: '2px solid #e8eaf6',
        paddingBottom: '10px'
      }}>{props.name}</h2>
      <p style={{
        fontSize: '1.1rem',
        margin: '10px 0',
        color: '#333'
      }}>Age: <span style={{
        fontWeight: '600',
        color: '#3949ab'
      }}>{props.age}</span></p>
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#424242',
        marginBottom: '0'
      }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
