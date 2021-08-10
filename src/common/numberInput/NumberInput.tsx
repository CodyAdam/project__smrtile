import styles from './NumberInput.module.css';
import { useState } from 'react';

export function NumberInput({
  initialValue = 0,
  min = 0,
  max = 9999,
  incrementSpeed = 0.2,
  title,
  onChange,
}: {
  initialValue?: number;
  min?: number;
  max?: number;
  incrementSpeed?: number;
  title?: string;
  onChange?: (number: number) => void;
}) {
  const [value, setValue] = useState(initialValue);
  let lastPos = 0;

  function setSanitizedValue(newValue: number): void {
    const clamped = Math.max(min, Math.min(max, newValue));
    setValue(Math.ceil(clamped));
  }

  function handleLocalChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSanitizedValue(e.target.valueAsNumber);
    if (onChange) onChange(value);
  }

  function handleMouseDown(e: React.MouseEvent) {
    lastPos = e.pageX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleCancel);
  }

  function handleMouseMove(e: MouseEvent) {
    const dist = e.pageX - lastPos;
    setSanitizedValue(value + incrementSpeed * dist);
  }
  function handleCancel() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleCancel);
    if (onChange) onChange(value);
  }

  return (
    <div className={styles.container}>
      {title ? <div className={styles.title}>{`${title}:`}</div> : null}
      <input onChange={handleLocalChange} value={value} className={styles.input} type='number' />
      <div className={`icon icon-gripper ${styles.slider}`} onMouseDown={handleMouseDown}></div>
    </div>
  );
}
