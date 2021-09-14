import styles from './NumberInput.module.css';
import { useState, useEffect } from 'react';

export function NumberInput({
  value = 0,
  fixed = false,
  min = 0,
  max = 9999,
  invalid = false,
  incrementSpeed = 0.2,
  title,
  onChange,
}: {
  value?: number;
  fixed?: boolean;
  min?: number;
  max?: number;
  invalid?: boolean;
  incrementSpeed?: number;
  title?: string;
  onChange?: (number: number) => void;
}) {
  const [localValue, setLocalValue] = useState(value);
  let lastPos = 0;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  function getSanitizedValue(value: number): number {
    const clamped = Math.max(min, Math.min(max, value));
    return Math.ceil(clamped);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.valueAsNumber) {
      const newValue = getSanitizedValue(e.target.valueAsNumber);
      if (onChange) onChange(newValue);
      setLocalValue(newValue);
    } else {
      if (onChange) onChange(0);
      setLocalValue(0);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    lastPos = e.pageX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const dist = e.pageX - lastPos;
    setLocalValue(getSanitizedValue(localValue + incrementSpeed * dist));
    if (onChange) onChange(getSanitizedValue(localValue + incrementSpeed * dist));
  }

  function handleMouseUp(e: MouseEvent) {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mouseleave', handleMouseUp);
    if (onChange) {
      const dist = e.pageX - lastPos;
      onChange(getSanitizedValue(localValue + incrementSpeed * dist));
    }
  }

  return (
    <div className={styles.container}>
      {title ? <div className={styles.title}>{`${title}:`}</div> : null}
      <input
        onChange={handleChange}
        value={localValue.toString()}
        className={`${styles.input} ${invalid ? styles.invalid : ''} ${fixed ? styles.fixed : 'null'}`}
        type='number'
      />
      {fixed ? null : <div className={`icon icon-gripper ${styles.slider}`} onMouseDown={handleMouseDown}></div>}
    </div>
  );
}
