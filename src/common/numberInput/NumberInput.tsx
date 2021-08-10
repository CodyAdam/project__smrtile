import styles from './NumberInput.module.css';
import { useState } from 'react';

export function NumberInput({
  value = 0,
  min = 0,
  max = 9999,
  invalid = false,
  incrementSpeed = 0.2,
  title,
  onChange,
}: {
  value?: number;
  min?: number;
  max?: number;
  invalid?: boolean;
  incrementSpeed?: number;
  title?: string;
  onChange?: (number: number) => void;
}) {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  let lastPos = 0;

  function getSanitizedValue(value: number): number {
    const clamped = Math.max(min, Math.min(max, value));
    return Math.ceil(clamped);
  }

  function handleLocalChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.valueAsNumber) {
      const newValue = getSanitizedValue(e.target.valueAsNumber);
      setLocalValue(newValue);
    } else setLocalValue(0);
  }

  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);
    lastPos = e.pageX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const dist = e.pageX - lastPos;
    setLocalValue(getSanitizedValue(localValue + incrementSpeed * dist));
  }

  function handleMouseUp(e: MouseEvent) {
    setIsDragging(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mouseleave', handleMouseUp);
    if (onChange) {
      const dist = e.pageX - lastPos;
      onChange(getSanitizedValue(localValue + incrementSpeed * dist));
    }
  }

  function handleSave() {
    if (localValue !== value && onChange && !isDragging) onChange(localValue);
  }

  return (
    <div className={styles.container}>
      {title ? <div className={styles.title}>{`${title}:`}</div> : null}
      <input
        onChange={handleLocalChange}
        value={localValue}
        className={`${styles.input} ${invalid ? styles.invalid : ''}`}
        type='number'
        onMouseLeave={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
        }}
      />
      <div className={`icon icon-gripper ${styles.slider}`} onMouseDown={handleMouseDown}></div>
    </div>
  );
}
