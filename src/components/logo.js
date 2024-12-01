// src/Logo.js
import React from 'react';

const Logo = () => {
  return (
    <div style={styles.logoContainer}>
      {/* If using an image logo */}
      <img src="/path/to/logo.png" alt="Logo" style={styles.logoImage} />

      {/* If using a text logo */}
      {/* <h1 style={styles.logoText}>MyLogo</h1> */}
    </div>
  );
};

const styles = {
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100px', // Adjust the size as needed
    height: 'auto',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default Logo;