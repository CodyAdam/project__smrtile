import { useEffect, useRef, useState } from 'react';
import styles from './Resizable.module.css';

export function ResizeHorizontal({
  children,
  min = 0,
  max = 100,
}: {
  children: [React.ReactNode, React.ReactNode];
  min?: number;
  max?: number;
}) {
  const [value, setValue] = useState(50);
  const div = useRef<HTMLDivElement>(null);
  let lastPos = 0;

  function clearSelection() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) selection.removeAllRanges();
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    clearSelection();
    lastPos = e.clientX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const pixDiff = e.clientX - lastPos;
    if (div.current) {
      const percentDiff = (100 * pixDiff) / div.current.clientWidth;
      const clamped = Math.max(min, Math.min(max, value + percentDiff));
      setValue(clamped);
    }
  }

  function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mouseleave', handleMouseUp);
  }

  return (
    <div ref={div} className={styles.container} style={{ gridTemplateColumns: `${value}% ${100 - value}%` }}>
      {children[0]}
      <div
        onMouseDown={handleMouseDown}
        className={`${styles.resizeBar} ${styles.horizontal}`}
        style={{ left: `calc(${value}% - 3px` }}
      />
      {children[1]}
    </div>
  );
}

export function ResizeVertical({
  onResize,
  className,
  children,
  min = 0,
  max = 100,
}: {
  onResize?: (value: number) => void;
  className?: string;
  children: [React.ReactNode, React.ReactNode];
  min?: number;
  max?: number;
}) {
  const [value, setValue] = useState(50);
  const div = useRef<HTMLDivElement>(null);
  let lastPos = 0;

  useEffect(() => {
    if (onResize) onResize(value);
  }, [value]);

  function clearSelection() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) selection.removeAllRanges();
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    clearSelection();
    lastPos = e.clientY;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const pixDiff = e.clientY - lastPos;
    if (div.current) {
      const percentDiff = (100 * pixDiff) / div.current.clientHeight;
      const clamped = Math.max(min, Math.min(max, value + percentDiff));
      setValue(clamped);
    }
  }

  function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mouseleave', handleMouseUp);
  }

  return (
    <div
      ref={div}
      className={`${className} ${styles.container}`}
      style={{ gridTemplateRows: `${value}% ${100 - value}%` }}
    >
      {children[0]}
      <div
        onMouseDown={handleMouseDown}
        className={`${styles.resizeBar} ${styles.vertical}`}
        style={{ top: `calc(${value}% - 3px` }}
      />
      {children[1]}
    </div>
  );
}
