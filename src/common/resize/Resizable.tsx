import { useEffect, useRef, useState } from 'react';
import styles from './Resizable.module.css';

function clearSelection() {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (selection) selection.removeAllRanges();
  }
}
export type HorizontalSize = { left: number; right: number };
export function ResizeHorizontal({
  onResize,
  className,
  children,
  init = 50,
  min = 0,
  max = 100,
}: {
  onResize?: (value: HorizontalSize) => void;
  className?: string;
  children: [React.ReactNode, React.ReactNode];
  init?: number;
  min?: number;
  max?: number;
}) {
  const [value, setValue] = useState(init);
  const div = useRef<HTMLDivElement>(null);
  let lastPos = 0;

  useEffect(() => {
    window.addEventListener('resize', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, [handleChange]);

  useEffect(() => {
    handleChange();
  }, [value, onResize, handleChange]);

  function handleChange() {
    if (onResize && div.current)
      onResize({
        left: (value / 100) * div.current.clientWidth,
        right: div.current.clientWidth - (value / 100) * div.current.clientWidth,
      });
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
    <div
      ref={div}
      className={`${className} ${styles.container}`}
      style={{ gridTemplateColumns: `${value}% ${100 - value}%` }}
    >
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

export type VerticalSize = { top: number; bottom: number };
export function ResizeVertical({
  onResize,
  className,
  children,
  init = 50,
  min = 0,
  max = 100,
}: {
  onResize?: (value: VerticalSize) => void;
  className?: string;
  children: [React.ReactNode, React.ReactNode];
  init?: number;
  min?: number;
  max?: number;
}) {
  const [value, setValue] = useState(init);
  const div = useRef<HTMLDivElement>(null);
  let lastPos = 0;

  useEffect(() => {
    window.addEventListener('resize', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  });

  useEffect(() => {
    handleChange();
  }, [value, onResize, handleChange]);

  function handleChange() {
    if (onResize && div.current)
      onResize({
        top: (value / 100) * div.current.clientHeight,
        bottom: div.current.clientHeight - (value / 100) * div.current.clientHeight,
      });
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
