import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../utils/AuthContext'
import Header from '../components/Header'
import OutputPreview from '../components/OutputPreview'
import styles from '../styles/OutputView.module.css'

function OutputView() {
  const { lessonId } = useParams()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (currentUser && lessonId) {
      loadOutput()
    }
  }, [currentUser, lessonId])

  const loadOutput = async () => {
    try {
      const progressId = `${currentUser.uid}_${lessonId}`
      const progressDoc = await getDoc(doc(db, 'progress', progressId))

      if (progressDoc.exists()) {
        const progressData = progressDoc.data()
        setHtml(progressData.htmlCode || '')
        setCss(progressData.cssCode || '')
        setJs(progressData.jsCode || '')
      } else {
        setError('No output found. Please complete the lesson first.')
      }
    } catch (error) {
      console.error('Error loading output:', error)
      setError('Failed to load output. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>Loading output...</div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <div className={styles.error}>{error}</div>
            <button
              className={styles.backButton}
              onClick={() => navigate(`/lesson/${lessonId}`)}
            >
              Back to Lesson
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Output Preview</h1>
            <p className={styles.subtitle}>View your completed code output</p>
          </div>
          <button
            className={styles.backButton}
            onClick={() => navigate(`/lesson/${lessonId}`)}
          >
            ← Back to Lesson
          </button>
        </div>

        <div className={styles.outputContainer}>
          <OutputPreview html={html} css={css} js={js} />
        </div>
      </div>
    </>
  )
}

export default OutputView

