import styles from '../styles/LessonContent.module.css'

function LessonContent({ title, content }) {
  // Convert content to formatted list if it's a string
  const formatContent = (text) => {
    if (!text) return []
    
    // Split by lines
    const lines = text.split('\n').filter(line => line.trim())
    
    return lines.map((line, index) => {
      const trimmed = line.trim()
      const isNested = trimmed.startsWith('  •') || (trimmed.startsWith('•') && line.startsWith('  '))
      const level = isNested ? 2 : 1
      const text = trimmed.replace(/^[\s•]*/, '')
      
      return { id: index, level, text }
    })
  }

  const items = formatContent(content)

  return (
    <div className={styles.lessonContent}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        {items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((item) => (
              <li
                key={item.id}
                className={item.level === 2 ? styles.nestedItem : styles.item}
              >
                {item.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.placeholder}>No content available</p>
        )}
      </div>
    </div>
  )
}

export default LessonContent

