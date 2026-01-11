import { useEffect, useRef } from 'react'
import styles from '../styles/OutputPreview.module.css'

function OutputPreview({ html, css, js }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        // Clear previous content
        iframeDoc.open()
        
        // Escape script tags in JavaScript to prevent breaking the script tag
        const escapedJs = (js || '').replace(/<\/script>/gi, '<\\/script>')
        
        // Clean HTML - remove any script tags that might be displayed as text
        // This ensures only our injected script runs
        let cleanHtml = html || ''
        
        // Write the HTML document
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${css || ''}</style>
            </head>
            <body>
              ${cleanHtml}
            </body>
          </html>
        `)
        iframeDoc.close()
        
        // Inject JavaScript after document is loaded to ensure it executes
        // This method prevents JavaScript from being displayed as text
        if (escapedJs && escapedJs.trim()) {
          try {
            const script = iframeDoc.createElement('script')
            script.textContent = js || ''
            iframeDoc.body.appendChild(script)
          } catch (e) {
            // Fallback: try to write script in head
            try {
              const script = iframeDoc.createElement('script')
              script.textContent = js || ''
              iframeDoc.head.appendChild(script)
            } catch (err) {
              console.error('Error injecting script:', err)
            }
          }
        }
      }
    }
  }, [html, css, js])

  return (
    <div className={styles.outputPreview}>
      <iframe
        ref={iframeRef}
        className={styles.iframe}
        title="Code Output"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}

export default OutputPreview

