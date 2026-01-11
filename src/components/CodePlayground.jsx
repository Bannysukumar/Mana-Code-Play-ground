import { useState } from 'react'
import Editor from '@monaco-editor/react'
import OutputPreview from './OutputPreview'
import styles from '../styles/CodePlayground.module.css'

function CodePlayground({ html, css, js, onCodeChange }) {
  const [activeEditor, setActiveEditor] = useState('html') // 'html', 'css', or 'js'
  const [showOutput, setShowOutput] = useState(true) // Show/hide output panel

  const handleEditorChange = (value) => {
    if (activeEditor === 'html') {
      onCodeChange({ html: value || '', css, js })
    } else if (activeEditor === 'css') {
      onCodeChange({ html, css: value || '', js })
    } else if (activeEditor === 'js') {
      onCodeChange({ html, css, js: value || '' })
    }
  }

  const getCurrentLanguage = () => {
    if (activeEditor === 'html') return 'html'
    if (activeEditor === 'css') return 'css'
    if (activeEditor === 'js') return 'javascript'
    return 'html'
  }

  const getCurrentValue = () => {
    if (activeEditor === 'html') return html
    if (activeEditor === 'css') return css
    if (activeEditor === 'js') return js
    return ''
  }

  return (
    <div className={styles.codePlayground}>
      <div className={`${styles.playgroundContainer} ${!showOutput ? styles.outputHidden : ''}`}>
        {/* Editors Section */}
        <div className={styles.editorsSection}>
          <div className={styles.editorTabs}>
            <button
              className={`${styles.editorTab} ${activeEditor === 'html' ? styles.active : ''}`}
              onClick={() => setActiveEditor('html')}
            >
              <span className={styles.tabIcon}>📄</span>
              HTML
            </button>
            <button
              className={`${styles.editorTab} ${activeEditor === 'css' ? styles.active : ''}`}
              onClick={() => setActiveEditor('css')}
            >
              <span className={styles.tabIcon}>🎨</span>
              CSS
            </button>
            <button
              className={`${styles.editorTab} ${activeEditor === 'js' ? styles.active : ''}`}
              onClick={() => setActiveEditor('js')}
            >
              <span className={styles.tabIcon}>⚡</span>
              JavaScript
            </button>
          </div>
          <div className={styles.editorWrapper}>
            <Editor
              height="100%"
              language={getCurrentLanguage()}
              value={getCurrentValue()}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 2,
                formatOnPaste: true,
                formatOnType: true,
                lineNumbers: 'on',
                renderLineHighlight: 'all'
              }}
            />
          </div>
        </div>

        {/* Output Section */}
        {showOutput && (
          <div className={styles.outputSection}>
            <div className={styles.outputHeader}>
              <span className={styles.outputIcon}>👁️</span>
              <span className={styles.outputTitle}>Live Preview</span>
              <button
                className={styles.toggleOutputBtn}
                onClick={() => setShowOutput(false)}
                title="Hide Output"
                aria-label="Hide Output"
              >
                ✕
              </button>
            </div>
            <div className={styles.outputContent}>
              <OutputPreview html={html} css={css} js={js} />
            </div>
          </div>
        )}
        
        {/* Show Output Button (when hidden) */}
        {!showOutput && (
          <div className={styles.showOutputBtnContainer}>
            <button
              className={styles.showOutputBtn}
              onClick={() => setShowOutput(true)}
              title="Show Output"
              aria-label="Show Output"
            >
              <span className={styles.outputIcon}>👁️</span>
              <span>Show Output</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodePlayground
