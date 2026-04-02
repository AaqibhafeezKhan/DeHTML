import { useState } from 'react'
import { useToast } from '../../context/ToastContext'
import styles from './MinifierTool.module.css'

export default function MinifierTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [type, setType] = useState('html')
  const { showToast } = useToast()

  const handleMinify = () => {
    if (!input.trim()) {
      showToast('Please enter some code to minify', 'error')
      return
    }
    
    let result = input;
    if (type === 'html') {
      // Basic HTML minification: remove comments and extra whitespace
      result = result
        .replace(/<!--[\s\S]*?-->/g, '') // remove comments
        .replace(/\s+/g, ' ')            // collapse whitespace
        .replace(/>\s+</g, '><')         // remove space between tags
        .trim();
    } else if (type === 'css') {
      // Basic CSS minification
      result = result
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
        .replace(/\s+/g, ' ')             // collapse whitespace
        .replace(/\s*([{}:;,])\s*/g, '$1')// remove space around operators
        .trim();
    } else if (type === 'js') {
      // Basic JS minification (very primitive)
      result = result
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
        .replace(/\/\/.*/g, '')           // remove single-line comments
        .replace(/\s+/g, ' ')             // collapse whitespace
        .replace(/\s*([=+\-*/<>{}()[\],;:&|!])\s*/g, '$1') // remove space around operators
        .trim();
    }

    setOutput(result)
    const originalSize = new Blob([input]).size
    const newSize = new Blob([result]).size
    const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    showToast(`Minified successfully! Saved ${saved}%`, 'success')
  }

  const handleCopy = async () => {
    if (!output) {
      showToast('Nothing to copy!', 'error')
      return
    }
    try {
      await navigator.clipboard.writeText(output)
      showToast('Copied to clipboard!', 'success')
    } catch {
      showToast('Failed to copy', 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type="radio" value="html" checked={type === 'html'} onChange={() => setType('html')} />
            HTML
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" value="css" checked={type === 'css'} onChange={() => setType('css')} />
            CSS
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" value="js" checked={type === 'js'} onChange={() => setType('js')} />
            JS
          </label>
        </div>
        <div className={styles.actions}>
          <button onClick={handleClear} className={styles.btnSecondary}>Clear</button>
          <button onClick={handleMinify} className={styles.btnPrimary}>Minify Code</button>
          <button onClick={handleCopy} className={styles.btnSecondary}>Copy Output</button>
        </div>
      </div>
      
      <div className={styles.editors}>
        <div className={styles.editorBox}>
          <label className={styles.label}>Original {type.toUpperCase()} Code</label>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${type.toUpperCase()} here...`}
          />
        </div>
        <div className={styles.editorBox}>
          <label className={styles.label}>Minified Result</label>
          <textarea
            className={`${styles.textarea} ${styles.output}`}
            value={output}
            readOnly
            placeholder="Minified output will appear here..."
          />
        </div>
      </div>
    </div>
  )
}
