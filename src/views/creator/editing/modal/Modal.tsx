import styles from './Modal.module.css';

export function Modal({ children, onCancel }: { children: React.ReactNode; onCancel: () => void }) {
  return (
    <div className={styles.container}>
      <div onClick={onCancel} className={styles.spacer} />
      <div onClick={onCancel} className={styles.spacer} />
      <div onClick={onCancel} className={styles.spacer} />
      <div onClick={onCancel} className={styles.spacer} />
      <div className={styles.subContainer}>{children}</div>
      <div onClick={onCancel} className={styles.spacer} />
      <div onClick={onCancel} className={styles.spacer} />
      <div onClick={onCancel} className={styles.spacer} />
      <div onClick={onCancel} className={styles.spacer} />
    </div>
  );
}
