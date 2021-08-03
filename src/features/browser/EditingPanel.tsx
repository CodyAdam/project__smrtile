import { useAppSelector } from '../../app/hooks';
import { selectedContentSelector } from './browserSlice';
import styles from './EditingPanel.module.css';

export function EditingPanel() {
  const selectedContent = useAppSelector(selectedContentSelector);
  if (!selectedContent)
    return (
      <div className={`${styles.container} ${styles.placeholder}`}>
        <p>Select an element inside the Browser or add a new element with the icon to start</p>
      </div>
    );
  return <div className={styles.container}>{selectedContent?.id}</div>;
}
