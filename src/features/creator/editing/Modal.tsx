import styles from './Modal.module.css';

export function Modal({ children }: { children: React.ReactNode }) {
  function handleCancel() {
    console.log('cancel');
  }

  return (
    <div className={styles.container}>
      <div onClick={handleCancel} className={styles.spacer} />
      <div onClick={handleCancel} className={styles.spacer} />
      <div onClick={handleCancel} className={styles.spacer} />
      <div onClick={handleCancel} className={styles.spacer} />
      <div className={styles.subContainer}>{children}</div>
      <div onClick={handleCancel} className={styles.spacer} />
      <div onClick={handleCancel} className={styles.spacer} />
      <div onClick={handleCancel} className={styles.spacer} />
      <div onClick={handleCancel} className={styles.spacer} />
    </div>
  );
}
