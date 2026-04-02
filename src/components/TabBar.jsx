import React from 'react';

const TabBar = ({ tabs, active, onChange }) => {
  return (
    <div style={{
      display: 'inline-flex',
      gap: '0.5rem',
      padding: '0.4rem',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '2rem',
      backdropFilter: 'blur(8px)',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
      marginBottom: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: '0.6rem 1.25rem',
            border: 'none',
            borderRadius: '1.5rem',
            background: active === tab.id ? 'var(--primary)' : 'transparent',
            color: active === tab.id ? '#fff' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: active === tab.id ? '0 4px 12px var(--primary-glow)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (active !== tab.id) {
               e.target.style.color = 'var(--text-primary)';
               e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (active !== tab.id) {
               e.target.style.color = 'var(--text-secondary)';
               e.target.style.background = 'transparent';
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
