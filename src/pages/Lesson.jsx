import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../utils/AuthContext'
import Header from '../components/Header'
import CodePlayground from '../components/CodePlayground'
import HelpButton from '../components/HelpButton'
import PublishModal from '../components/PublishModal'
import Toast from '../components/Toast'
import styles from '../styles/Lesson.module.css'

function Lesson() {
  const { lessonId } = useParams()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })
  const [publishedProjectId, setPublishedProjectId] = useState(null)
  const saveTimeoutRef = useRef(null)

  // Load lesson data
  useEffect(() => {
    loadLesson()
  }, [lessonId])

  // Load user progress
  useEffect(() => {
    if (currentUser && lessonId) {
      loadProgress()
    }
  }, [currentUser, lessonId])

  const loadLesson = async () => {
    try {
      const lessonDoc = await getDoc(doc(db, 'lessons', lessonId))
      
      if (lessonDoc.exists()) {
        setLesson({ id: lessonDoc.id, ...lessonDoc.data() })
      } else {
        // Default lesson if not found in Firestore
        setLesson({
          id: lessonId,
          title: 'Step by Step Process of achieving the Favourite Places Section',
          content: `• Create HTML structure
  • Add container div for the section
  • Create heading element
  • Add placeholder cards

• Style with CSS
  • Add flexbox layout
  • Style cards with shadows
  • Add responsive design
  • Include hover effects

• Add JavaScript functionality
  • Implement data rendering
  • Add interactivity
  • Handle user interactions`
        })
      }
    } catch (error) {
      console.error('Error loading lesson:', error)
      // Fallback to default lesson
      setLesson({
        id: lessonId,
        title: 'Step by Step Process of achieving the Favourite Places Section',
        content: `• Create HTML structure
  • Add container div for the section
  • Create heading element
  • Add placeholder cards

• Style with CSS
  • Add flexbox layout
  • Style cards with shadows
  • Add responsive design
  • Include hover effects

• Add JavaScript functionality
  • Implement data rendering
  • Add interactivity
  • Handle user interactions`
      })
    } finally {
      setLoading(false)
    }
  }

  const loadProgress = async () => {
    try {
      const progressId = `${currentUser.uid}_${lessonId}`
      const progressDoc = await getDoc(doc(db, 'progress', progressId))

      if (progressDoc.exists()) {
        const progressData = progressDoc.data()
        setHtml(progressData.htmlCode || '')
        setCss(progressData.cssCode || '')
        setJs(progressData.jsCode || '')
        setCompleted(progressData.completed || false)
      } else {
        // Set default starter code
        setHtml('<div class="container">\n  <h1>Favourite Places</h1>\n  <div class="places-grid">\n    <!-- Your code here -->\n  </div>\n</div>')
        setCss('.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.places-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}')
        setJs('// Add your JavaScript here\nconsole.log("Hello, World!")')
      }
    } catch (error) {
      console.error('Error loading progress:', error)
      // Set default starter code on error
      setHtml('<div class="container">\n  <h1>Favourite Places</h1>\n  <div class="places-grid">\n    <!-- Your code here -->\n  </div>\n</div>')
      setCss('.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.places-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}')
      setJs('// Add your JavaScript here\nconsole.log("Hello, World!")')
    } finally {
      setLoading(false)
    }
  }

  // Save progress to Firestore (debounced)
  const saveProgress = (htmlCode, cssCode, jsCode) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(async () => {
      if (!currentUser) return

      try {
        setSaving(true)
        const progressId = `${currentUser.uid}_${lessonId}`
        
        await setDoc(
          doc(db, 'progress', progressId),
          {
            uid: currentUser.uid,
            lessonId: lessonId,
            htmlCode,
            cssCode,
            jsCode,
            completed: completed,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        )
      } catch (error) {
        console.error('Error saving progress:', error)
      } finally {
        setSaving(false)
      }
    }, 1000)
  }

  // Handle code changes
  const handleCodeChange = ({ html: newHtml, css: newCss, js: newJs }) => {
    setHtml(newHtml)
    setCss(newCss)
    setJs(newJs)
    saveProgress(newHtml, newCss, newJs)
  }

  // Mark lesson as completed
  const handleComplete = async () => {
    if (!currentUser) return

    try {
      const progressId = `${currentUser.uid}_${lessonId}`
      
      await setDoc(
        doc(db, 'progress', progressId),
        {
          uid: currentUser.uid,
          lessonId: lessonId,
          htmlCode: html,
          cssCode: css,
          jsCode: js,
          completed: true,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      )

      setCompleted(true)
    } catch (error) {
      console.error('Error marking as completed:', error)
    }
  }

  // Check if code is empty
  const isCodeEmpty = () => {
    return !html.trim() && !css.trim() && !js.trim()
  }

  // Handle publish button click
  const handlePublishClick = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    if (isCodeEmpty()) {
      setToast({
        isVisible: true,
        message: 'Please write some code before publishing',
        type: 'error'
      })
      return
    }
    setShowPublishModal(true)
  }

  // Handle publish confirmation
  const handlePublishConfirm = async (projectName) => {
    if (!currentUser) return
    
    // Validate project name (this should be handled by modal, but double-check)
    if (!projectName || !projectName.trim()) {
      setToast({
        isVisible: true,
        message: 'Please enter a project name',
        type: 'error'
      })
      return
    }

    setIsPublishing(true)

    try {
      // Check if user already has a published project for this lesson
      const publishedQuery = query(
        collection(db, 'publishedProjects'),
        where('uid', '==', currentUser.uid),
        where('lessonId', '==', lessonId)
      )
      const existingProjects = await getDocs(publishedQuery)

      let projectId

      if (!existingProjects.empty) {
        // Update existing project
        const existingProject = existingProjects.docs[0]
        projectId = existingProject.id
        
        await setDoc(
          doc(db, 'publishedProjects', projectId),
          {
            uid: currentUser.uid, // Include uid to maintain ownership
            lessonId: lessonId,
            title: projectName.trim(),
            htmlCode: html,
            cssCode: css,
            jsCode: js,
            isPublic: true,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        )
      } else {
        // Create new project
        const projectRef = await addDoc(collection(db, 'publishedProjects'), {
          uid: currentUser.uid,
          lessonId: lessonId,
          title: projectName.trim(),
          htmlCode: html,
          cssCode: css,
          jsCode: js,
          isPublic: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
        projectId = projectRef.id
      }

      setPublishedProjectId(projectId)
      setShowPublishModal(false)
      
      // Show success toast with URL
      const publicUrl = `${window.location.origin}/p/${projectId}`
      setToast({
        isVisible: true,
        message: `Project published! URL: ${publicUrl}`,
        type: 'success'
      })

      // Redirect to public page after a short delay
      setTimeout(() => {
        navigate(`/p/${projectId}`)
      }, 2000)
    } catch (error) {
      console.error('Error publishing project:', error)
      setToast({
        isVisible: true,
        message: 'Failed to publish project. Please try again.',
        type: 'error'
      })
      setShowPublishModal(false)
    } finally {
      setIsPublishing(false)
    }
  }

  // Copy URL to clipboard
  const copyUrlToClipboard = (url) => {
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

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>Loading lesson...</div>
        </div>
      </>
    )
  }

  if (!lesson) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.error}>Lesson not found</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          {completed && (
            <div className={styles.outputButtonContainer}>
              <button
                className={styles.showOutputButton}
                onClick={() => navigate(`/lesson/${lessonId}/output`)}
              >
                👁️ Show Output
              </button>
            </div>
          )}

          <CodePlayground
            html={html}
            css={css}
            js={js}
            onCodeChange={handleCodeChange}
          />

          <div className={styles.actions}>
            {saving && (
              <span className={styles.savingIndicator}>Saving...</span>
            )}
            <button
              className={styles.publishButton}
              onClick={handlePublishClick}
              disabled={isCodeEmpty() || !currentUser}
              title={!currentUser ? 'Please login to publish' : isCodeEmpty() ? 'Write some code first' : 'Publish your project'}
            >
              📤 Publish
            </button>
            <button
              className={`${styles.completeButton} ${completed ? styles.completed : ''}`}
              onClick={handleComplete}
              disabled={completed}
            >
              {completed ? '✓ Completed' : 'Mark as Completed'}
            </button>
          </div>
        </div>
      </div>
      <HelpButton />
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={handlePublishConfirm}
        isLoading={isPublishing}
        defaultName={lesson?.title || ''}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  )
}

export default Lesson

