import { useState, useEffect } from 'react'
import styles from '../styles/InstallPrompt.module.css'

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if already shown in this session
    const shownBefore = sessionStorage.getItem('installPromptShown')
    if (shownBefore) {
      return
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show our custom prompt after a delay
      setTimeout(() => {
        setShowPrompt(true)
        sessionStorage.setItem('installPromptShown', 'true')
      }, 3000) // Show after 3 seconds
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  // Don't show if already installed or prompt is dismissed
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null
  }

  return (
    <div className={styles.installPrompt}>
      <div className={styles.promptContent}>
        <div className={styles.promptIcon}>📱</div>
        <div className={styles.promptText}>
          <h3 className={styles.promptTitle}>Install App</h3>
          <p className={styles.promptDescription}>
            Install Mana Code Playground to access it faster and work offline!
          </p>
        </div>
        <div className={styles.promptActions}>
          <button
            className={styles.installButton}
            onClick={handleInstallClick}
          >
            Install
          </button>
          <button
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt

