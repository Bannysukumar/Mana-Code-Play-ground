import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Header.module.css'

function Header() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate('/dashboard')}>
          Mana Code Playground
        </div>
        <div className={styles.actions}>
          <div className={styles.stat}>
            <span className={styles.icon}>🔥</span>
            <span className={styles.label}>7</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.icon}>⏱️</span>
            <span className={styles.label}>25m</span>
          </div>
          <div className={styles.menu} ref={menuRef}>
            <button className={styles.menuButton} onClick={toggleMenu} aria-label="Menu">
              <span>☰</span>
            </button>
            {isMenuOpen && (
              <>
                <div className={styles.menuOverlay} onClick={() => setIsMenuOpen(false)}></div>
                <div className={styles.sideMenu}>
                  <div className={styles.sideMenuHeader}>
                    <h3 className={styles.sideMenuTitle}>Menu</h3>
                    <button className={styles.closeButton} onClick={() => setIsMenuOpen(false)} aria-label="Close">
                      ×
                    </button>
                  </div>
                  <div className={styles.sideMenuBody}>
                    <div className={styles.menuItem} onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>
                      <span className={styles.menuIcon}>📊</span>
                      <span>Dashboard</span>
                    </div>
                    <div className={styles.menuItem} onClick={() => { navigate('/lesson/lesson-1'); setIsMenuOpen(false); }}>
                      <span className={styles.menuIcon}>💻</span>
                      <span>Code Playground</span>
                    </div>
                    <div className={styles.menuItem} onClick={() => { navigate('/published'); setIsMenuOpen(false); }}>
                      <span className={styles.menuIcon}>📤</span>
                      <span>Published Projects</span>
                    </div>
                    <div className={styles.menuDivider}></div>
                    <div className={`${styles.menuItem} ${styles.userEmailItem}`}>
                      <span className={styles.menuIcon}>👤</span>
                      <span className={styles.userEmail}>{currentUser?.email}</span>
                    </div>
                    <div className={styles.menuItem} onClick={handleLogout}>
                      <span className={styles.menuIcon}>🚪</span>
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

