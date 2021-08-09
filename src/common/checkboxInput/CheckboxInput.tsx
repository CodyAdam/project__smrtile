import styles from './CheckboxInput.module.css';

export function CheckboxInput({ value, onChange }: { value: boolean; onChange: (isChecked: boolean) => void }) {
  function handleChange() {
    onChange(!value);
  }
  return (
    <div className={styles.container}>
      <input type='checkbox' checked={value} onChange={handleChange} />
    </div>
  );
}
