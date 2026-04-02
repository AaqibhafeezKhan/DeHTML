import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const FormatterTool = () => {
  const { addToast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatHtml = (html) => {
    let formatted = '';
    let indent = '';
    const tab = '  ';
    
    html.split(/>\s*</).forEach(function(element) {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }
      
      formatted += indent + '<' + element + '>\r\n';
      
      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br") && !element.startsWith("hr")) { 
        indent += tab;              
      }
    });
    
    return formatted.substring(1, formatted.length - 3);
  };

  const handleFormat = () => {
    if (!input.trim()) {
      addToast('Please enter some HTML to format.', 'error');
      return;
    }
    
    try {
      setOutput(formatHtml(input));
      addToast('HTML formatted successfully!', 'success');
    } catch (e) {
      addToast('Error formatting HTML.', 'error');
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Input HTML:</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted HTML here..."
            style={textAreaStyle}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Formatted HTML:</label>
          <textarea 
            value={output}
            readOnly
            style={{...textAreaStyle, background: 'var(--bg-base)', whiteSpace: 'pre'}}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          onClick={handleFormat} 
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
          Format HTML
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

export default FormatterTool;
