import { useState, useEffect } from 'react'
import styles from '../styles/PublishModal.module.css'

function PublishModal({ isOpen, onClose, onConfirm, isLoading, defaultName = '' }) {
  const [projectName, setProjectName] = useState('')

  // Reset project name when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setProjectName(defaultName || '')
    } else {
      setProjectName('')
    }
  }, [isOpen, defaultName])

  if (!isOpen) return null

  const handleConfirm = () => {
    if (projectName.trim()) {
      onConfirm(projectName.trim())
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && projectName.trim() && !isLoading) {
      handleConfirm()
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Publish Project</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close" disabled={isLoading}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.modalText}>
            This will create a public link to your output. Anyone with the link can view your project.
          </p>
          <div className={styles.inputGroup}>
            <label htmlFor="projectName" className={styles.label}>
              Project Name <span className={styles.required}>*</span>
            </label>
            <input
              id="projectName"
              type="text"
              className={styles.input}
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoFocus
            />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={styles.publishButton}
            onClick={handleConfirm}
            disabled={isLoading || !projectName.trim()}
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PublishModal

