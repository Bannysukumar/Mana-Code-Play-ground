import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../utils/AuthContext'
import Header from '../components/Header'
import styles from '../styles/Dashboard.module.css'

function Dashboard() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadLessons()
  }, [])

  const loadLessons = async () => {
    try {
      // Get lessons collection
      const lessonsSnapshot = await getDocs(collection(db, 'lessons'))
      const lessonsData = lessonsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Get user progress for each lesson
      if (currentUser) {
        const progressPromises = lessonsData.map(async (lesson) => {
          const progressDoc = await getDoc(
            doc(db, 'progress', `${currentUser.uid}_${lesson.id}`)
          )
          return {
            ...lesson,
            completed: progressDoc.exists() ? progressDoc.data().completed : false
          }
        })

        const lessonsWithProgress = await Promise.all(progressPromises)
        setLessons(lessonsWithProgress)
      } else {
        setLessons(lessonsData)
      }
    } catch (error) {
      console.error('Error loading lessons:', error)
      // If lessons don't exist, create a default one
      setLessons([{
        id: 'lesson-1',
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
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>Loading lessons...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>My Lessons</h1>
          <p className={styles.subtitle}>Continue your coding journey</p>

          <div className={styles.lessonsGrid}>
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={styles.lessonCard}
                onClick={() => handleLessonClick(lesson.id)}
              >
                <div className={styles.lessonHeader}>
                  <h2 className={styles.lessonTitle}>{lesson.title}</h2>
                  {lesson.completed && (
                    <span className={styles.completedBadge}>✓ Completed</span>
                  )}
                </div>
                <p className={styles.lessonPreview}>
                  {lesson.content ? lesson.content.substring(0, 150) + '...' : 'Start learning...'}
                </p>
                <div className={styles.lessonFooter}>
                  <button className={styles.startButton}>
                    {lesson.completed ? 'Review' : 'Start Lesson'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

