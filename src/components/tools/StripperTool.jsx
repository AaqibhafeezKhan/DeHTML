import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const StripperTool = ({ input, setInput, output, setOutput }) => {
  const { addToast } = useToast();
  const [isStripping, setIsStripping] = useState(false);

  const stripHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const handleStrip = () => {
    if (!input.trim()) {
      addToast('Please enter some HTML text to strip.', 'error');
      return;
    }

    setIsStripping(true);

    setTimeout(() => {
      const stripped = stripHtml(input);
      setOutput(stripped);
      setIsStripping(false);
      addToast('HTML tags stripped successfully!', 'success');
    }, 300);
  };

  const handleCopy = async () => {
    if (!output.trim()) {
      addToast('No text to copy!', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      addToast('Text copied to clipboard!', 'success');
    } catch (err) {
      addToast('Failed to copy text. Please try again.', 'error');
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    addToast('Text areas cleared!', 'success');
  };

  const textAreaStyle = {
    width: '100%',
    height: '250px',
    background: 'var(--foreground-color)',
    color: 'var(--text-color-light)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius-base)',
    padding: '0.85rem',
    fontFamily: 'inherit',
    fontSize: '1rem',
    resize: 'vertical',
    transition: 'border-color 0.2s ease-in-out',
    outline: 'none'
  };

  const buttonStyle = (primary) => ({
    padding: '0.85rem 1.75rem',
    border: 'none',
    borderRadius: 'var(--border-radius-base)',
    background: primary ? 'var(--primary-color)' : 'var(--secondary-color)',
    color: 'var(--foreground-color)',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s ease-in-out, transform 0.1s ease',
    boxShadow: 'var(--box-shadow-small)',
    opacity: isStripping && primary ? 0.7 : 1
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Input HTML:</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML here..."
            style={textAreaStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-color)';
              e.target.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-color-dark)', fontWeight: '600', fontSize: '1.1rem' }}>Plain Text Output:</label>
          <textarea 
            value={output}
            readOnly
            placeholder="Stripped text will appear here..."
            style={{...textAreaStyle, background: 'var(--background-color)', userSelect: 'all'}}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          onClick={handleStrip} 
          disabled={isStripping}
          style={buttonStyle(true)}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isStripping ? 'Stripping...' : 'Strip HTML Tags'}
        </button>
        <button 
          onClick={handleCopy}
          style={buttonStyle(false)}
        >
          Copy
        </button>
        <button 
          onClick={handleReset}
          style={{...buttonStyle(false)}}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StripperTool;
