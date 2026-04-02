import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const EncoderTool = () => {
  const { addToast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const handleProcess = () => {
    if (!input.trim()) {
      addToast('Please enter some text to process.', 'error');
      return;
    }

    try {
      if (mode === 'encode') {
        const div = document.createElement('div');
        div.innerText = input;
        setOutput(div.innerHTML);
        addToast('Text encoded successfully!', 'success');
      } else {
        const div = document.createElement('div');
        div.innerHTML = input;
        setOutput(div.textContent || div.innerText || '');
        addToast('Text decoded successfully!', 'success');
      }
    } catch (e) {
      console.error(e);
      addToast('Error processing text.', 'error');
    }
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
      console.error(err);
      addToast('Failed to copy text.', 'error');
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    addToast('Text areas cleared!', 'success');
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
    outline: 'none'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button 
          onClick={() => setMode('encode')}
          style={{
            padding: '0.5rem 1rem',
            background: mode === 'encode' ? 'var(--primary-color)' : 'var(--bg-base)',
            color: mode === 'encode' ? '#fff' : 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          Encode HTML Entities
        </button>
        <button 
          onClick={() => setMode('decode')}
          style={{
            padding: '0.5rem 1rem',
            background: mode === 'decode' ? 'var(--primary-color)' : 'var(--bg-base)',
            color: mode === 'decode' ? '#fff' : 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          Decode HTML Entities
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Input Text:</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your text to ${mode} here...`}
            style={textAreaStyle}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Output Text:</label>
          <textarea 
            value={output}
            readOnly
            style={{...textAreaStyle, background: 'var(--bg-base)'}}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          onClick={handleProcess} 
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
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button 
          onClick={handleCopy}
          style={{
            padding: '0.75rem 1.5rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--secondary-color)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Copy
        </button>
        <button 
          onClick={handleReset}
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
          Reset
        </button>
      </div>
    </div>
  );
};

export default EncoderTool;
