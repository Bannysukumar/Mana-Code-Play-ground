import { useEffect } from 'react'
import styles from '../styles/Toast.module.css'

function Toast({ message, type = 'success', isVisible, onClose, duration = 5000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>
          {type === 'success' ? '✓' : '✕'}
        </span>
        <span className={styles.toastMessage}>{message}</span>
      </div>
      <button className={styles.toastClose} onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  )
}

export default Toast

