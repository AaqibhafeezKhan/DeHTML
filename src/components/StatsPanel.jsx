import React from 'react';

const StatsPanel = ({ text }) => {
  if (!text) return null;

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text.trim() ? text.split(/\r\n|\r|\n/).length : 0;

  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: 'var(--foreground-color)',
      borderRadius: 'var(--border-radius-base)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--box-shadow-small)',
      animation: 'fadeIn 0.5s ease-out forwards'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{charCount}</div>
        <div style={{ color: 'var(--text-color-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Characters</div>
      </div>
      <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{wordCount}</div>
        <div style={{ color: 'var(--text-color-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Words</div>
      </div>
      <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{lineCount}</div>
        <div style={{ color: 'var(--text-color-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Lines</div>
      </div>
    </div>
  );
};

export default StatsPanel;
