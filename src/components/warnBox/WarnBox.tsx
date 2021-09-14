import styles from './WarnBox.module.css';

export function WarnBox({ message }: { message: string }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.icon} icon icon-warning`} />
      <div className={styles.message}>{message}</div>
    </div>
  );
}
