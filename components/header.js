// src/Footer.js
import React from 'react';

const Footer = () => {
    return (
    <footer style={styles.footer}>
        <p>&copy; 2024 My Website</p>
    </footer>
    );
};

const styles = {
    footer: {
    backgroundColor: '#282c34',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    },
};

export default Footer;