import React from 'react';

const Header = () => {
  return (
    <header style={{
      padding: '2.5rem 1rem 1rem',
      textAlign: 'center',
    }}>
      <h1 style={{
        margin: 0,
        fontSize: '3rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
        letterSpacing: '-1px'
      }}>DeHTML Suite</h1>
      <p style={{
        color: 'var(--text-secondary)',
        marginTop: '0.5rem',
        fontSize: '1.1rem'
      }}>Advanced Web Developer Utilities</p>
    </header>
  );
};

export default Header;
