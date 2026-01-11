import { useState } from 'react'
import styles from '../styles/HelpButton.module.css'

function HelpButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleHelp = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className={styles.helpButton} onClick={toggleHelp} aria-label="Help">
        ?
      </button>
      {isOpen && (
        <div className={styles.helpModal} onClick={() => setIsOpen(false)}>
          <div className={styles.helpContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.helpHeader}>
              <h3>Need Help?</h3>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
            <div className={styles.helpBody}>
              <p><strong>Code Editor:</strong></p>
              <ul>
                <li>Switch between HTML, CSS, and JavaScript tabs to edit code</li>
                <li>Your code is automatically saved as you type</li>
                <li>View the output in real-time in the Output tab</li>
              </ul>
              <p style={{ marginTop: '16px' }}><strong>Tips:</strong></p>
              <ul>
                <li>Make sure your HTML structure is correct</li>
                <li>Use CSS for styling your elements</li>
                <li>Add JavaScript for interactivity</li>
                <li>Click "Mark as Completed" when you finish the lesson</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HelpButton

