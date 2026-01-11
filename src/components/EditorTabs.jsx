import styles from '../styles/EditorTabs.module.css'

function EditorTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' }
  ]

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default EditorTabs

