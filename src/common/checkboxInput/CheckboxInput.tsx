import styles from './CheckboxInput.module.css';

export function CheckboxInput({
  title,
  value,
  onChange,
}: {
  title?: string;
  value: boolean;
  onChange: (isChecked: boolean) => void;
}) {
  function handleClick() {
    onChange(!value);
  }
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>
        {value ? <div className={`icon icon-check ${styles.icon}`} /> : null}
      </button>
      {title ? <div className={styles.title}>{title}</div> : null}
    </div>
  );
}
