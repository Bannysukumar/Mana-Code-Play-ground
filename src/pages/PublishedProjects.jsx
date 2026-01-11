import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../utils/AuthContext'
import Header from '../components/Header'
import Toast from '../components/Toast'
import styles from '../styles/PublishedProjects.module.css'

function PublishedProjects() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })

  useEffect(() => {
    if (currentUser) {
      loadPublishedProjects()
    }
  }, [currentUser])

  const loadPublishedProjects = async () => {
    try {
      const projectsQuery = query(
        collection(db, 'publishedProjects'),
        where('uid', '==', currentUser.uid)
      )
      const querySnapshot = await getDocs(projectsQuery)
      
      const projectsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // Sort by updatedAt in descending order (newest first)
      projectsList.sort((a, b) => {
        const aTime = a.updatedAt?.toMillis?.() || a.updatedAt?.seconds * 1000 || 0
        const bTime = b.updatedAt?.toMillis?.() || b.updatedAt?.seconds * 1000 || 0
        return bTime - aTime
      })
      
      setProjects(projectsList)
    } catch (error) {
      console.error('Error loading published projects:', error)
      setToast({
        isVisible: true,
        message: 'Failed to load published projects',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyUrlToClipboard = (projectId) => {
    const url = `${window.location.origin}/p/${projectId}`
    navigator.clipboard.writeText(url).then(() => {
      setToast({
        isVisible: true,
        message: 'URL copied to clipboard!',
        type: 'success'
      })
    }).catch(() => {
      setToast({
        isVisible: true,
        message: 'Failed to copy URL',
        type: 'error'
      })
    })
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>Loading published projects...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Published Projects</h1>
          <p className={styles.subtitle}>
            View and manage all your published projects
          </p>
        </div>

        {projects.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <h2 className={styles.emptyTitle}>No published projects yet</h2>
            <p className={styles.emptyText}>
              Publish your first project from the Code Playground to get started!
            </p>
            <button
              className={styles.createButton}
              onClick={() => navigate('/lesson/lesson-1')}
            >
              Go to Code Playground
            </button>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.title || 'Untitled Project'}</h3>
                  <span className={styles.projectBadge}>Public</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.urlContainer}>
                    <label className={styles.urlLabel}>Public URL:</label>
                    <div className={styles.urlInputGroup}>
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/p/${project.id}`}
                        className={styles.urlInput}
                        onClick={(e) => e.target.select()}
                      />
                      <button
                        className={styles.copyButton}
                        onClick={() => copyUrlToClipboard(project.id)}
                        title="Copy URL"
                      >
                        📋
                      </button>
                      <button
                        className={styles.openButton}
                        onClick={() => window.open(`/p/${project.id}`, '_blank')}
                        title="Open in new tab"
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.dateLabel}>
                      Updated: {formatDate(project.updatedAt)}
                    </span>
                    {project.createdAt && project.createdAt !== project.updatedAt && (
                      <span className={styles.dateLabel}>
                        Created: {formatDate(project.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  )
}

export default PublishedProjects

