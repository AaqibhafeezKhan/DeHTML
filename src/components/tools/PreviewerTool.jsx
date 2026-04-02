import { useState } from 'react'
import styles from './PreviewerTool.module.css'

export default function PreviewerTool() {
  const [code, setCode] = useState('<h1>Hello Previewer!</h1>\n<style>\n  h1 { color: #ec4899; }\n</style>')

  return (
    <div className={styles.container}>
      <div className={styles.editorSection}>
        <label className={styles.label}>HTML / CSS / JS Code</label>
        <textarea
          className={styles.textarea}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste HTML here, script tags and style tags will execute..."
        />
      </div>
      <div className={styles.previewSection}>
        <label className={styles.label}>Live Preview</label>
        <iframe
          className={styles.iframe}
          srcDoc={code}
          title="Preview"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  )
}
