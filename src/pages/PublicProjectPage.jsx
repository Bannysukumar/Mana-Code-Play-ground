import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import OutputPreview from '../components/OutputPreview'
import styles from '../styles/PublicProjectPage.module.css'

function PublicProjectPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProject()
  }, [projectId])

  const loadProject = async () => {
    try {
      const projectDoc = await getDoc(doc(db, 'publishedProjects', projectId))

      if (projectDoc.exists()) {
        const projectData = projectDoc.data()
        
        // Check if project is public
        if (!projectData.isPublic) {
          setError('This project is not publicly available.')
          return
        }

        setProject({
          id: projectDoc.id,
          ...projectData
        })
      } else {
        setError('Project not found.')
      }
    } catch (error) {
      console.error('Error loading project:', error)
      setError('Failed to load project. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading project...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.error}>{error}</div>
          <button
            className={styles.backButton}
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.error}>Project not found</div>
          <button
            className={styles.backButton}
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <OutputPreview
        html={project.htmlCode || ''}
        css={project.cssCode || ''}
        js={project.jsCode || ''}
      />
    </div>
  )
}

export default PublicProjectPage

