import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const DiffTool = () => {
  const { addToast } = useToast();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState(null);

  const computeDiff = () => {
    if (!text1.trim() && !text2.trim()) {
      addToast('Please enter text in both fields to compare.', 'warning');
      return;
    }

    const words1 = text1.split(/(\s+)/);
    const words2 = text2.split(/(\s+)/);
    
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    const result = [];
    for (let i = 0; i < maxLines; i++) {
        const l1 = lines1[i] || '';
        const l2 = lines2[i] || '';
        if (l1 === l2) {
            result.push({ type: 'equal', text: l1 });
        } else {
            if (i < lines1.length) result.push({ type: 'removed', text: l1 });
            if (i < lines2.length) result.push({ type: 'added', text: l2 });
        }
    }
    setDiffResult(result);
    addToast('Diff calculated.', 'success');
  };

  const textAreaStyle = {
    width: '100%',
    minHeight: '200px',
    background: 'var(--bg-base)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-glass)',
    borderRadius: 'var(--radius-md)',
    padding: '1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    resize: 'vertical',
    outline: 'none',
    whiteSpace: 'pre'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Original Text:</label>
          <textarea 
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste original text here..."
            style={textAreaStyle}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Modified Text:</label>
          <textarea 
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste modified text here..."
            style={textAreaStyle}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          onClick={computeDiff} 
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-color)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Compare Texts
        </button>
        <button 
          onClick={() => { setText1(''); setText2(''); setDiffResult(null); }}
          style={{
            padding: '0.75rem 1.5rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-base)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Clear
        </button>
      </div>

      {diffResult && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-mono)',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Difference Output:</h3>
          {diffResult.map((line, idx) => (
            <div key={idx} style={{
              background: line.type === 'added' ? 'var(--success-color-light)' : 
                          line.type === 'removed' ? 'var(--error-color-light)' : 'transparent',
              color: line.type === 'added' ? 'var(--success-color)' : 
                     line.type === 'removed' ? 'var(--error-color)' : 'var(--text-color-dark)',
              padding: '0.25rem',
              whiteSpace: 'pre-wrap'
            }}>
              {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}
              {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiffTool;
