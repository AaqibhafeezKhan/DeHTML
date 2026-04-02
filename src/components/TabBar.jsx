import React from 'react';

const TabBar = ({ tabs, active, onChange }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '0',
      marginBottom: '2rem',
      justifyContent: 'center',
      borderBottom: '1px solid var(--border-color)'
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid',
            borderColor: active === tab.id ? 'var(--primary-color)' : 'var(--border-color)',
            background: active === tab.id ? 'var(--primary-color)' : 'var(--bg-surface)',
            color: active === tab.id ? '#fff' : 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'all 0.2s',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
