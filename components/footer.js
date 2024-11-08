// src/Header.js
import React from 'react';

const Header = () => {
    return (
    <header style={styles.header}>
        <h1>3D-AVATAR</h1>
        <nav>
        <ul style={styles.navList}>
            <li><a href="/">Home</a></li>
            <li><a href="/create">Create</a></li>
            <li><a href="/credits">Credits</a></li>
        </ul>
        </nav>
    </header>
    );
};

const styles = {
    header: {
    backgroundColor: '#282c34',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    },
    navList: {
    listStyleType: 'none',
    padding: 0,
    },
};

export default Header;