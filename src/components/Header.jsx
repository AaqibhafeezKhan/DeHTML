import React from 'react';

const Header = () => {
  return (
    <header style={{
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{
        margin: 0,
        fontSize: '2.25rem',
        fontWeight: '700',
        color: 'var(--text-color-dark)',
      }}>HTML Tag Stripper</h1>
    </header>
  );
};

export default Header;
