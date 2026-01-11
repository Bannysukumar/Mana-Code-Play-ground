import styles from '../styles/CompletedBadge.module.css'

function CompletedBadge() {
  return (
    <div className={styles.badge}>
      <span className={styles.icon}>✓</span>
      <span className={styles.text}>Completed</span>
    </div>
  )
}

export default CompletedBadge

