import React, { useState, useEffect } from 'react';
import styles from './Browser.module.css';
import FilterIcon from '../../common/svg/Star';
import { TilesetCreation } from './TilesetCreation';
import SmallSquareButton from '../../common/smallSquareButton/SmallSquareButton';

export function Browser() {
  const [width, setWidth] = useState<number>(300);
  let lastWidth = width;
  let lastPos: number = 0;

  useEffect(() => {
    console.log(width);
  }, [width]);

  function handleDragStart(e: React.MouseEvent<HTMLDivElement>) {
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    lastPos = e.clientX;
    lastWidth = width;
  }

  function handleDragEnd() {
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
  }

  function handleDragMove(e: MouseEvent) {
    lastWidth = lastWidth + e.clientX - lastPos;
    setWidth(lastWidth);
    lastPos = e.clientX;
  }

  return (
    <div
      className={styles.container}
      style={{ width: `${width}px`, minWidth: `200px`, maxWidth: `${window.innerWidth - 100}px` }}
    >
      <div className={styles.title}>
        <span>BROWSER</span>
        <SmallSquareButton onClick={() => {}} className={styles.titleButton}>
          <FilterIcon />
        </SmallSquareButton>
      </div>
      <h2>RULES</h2>
      <h2>BRUSHES</h2>
      <h2>TILESETS</h2>
      <TilesetCreation />
      <div className={styles.resizeBar} onMouseDown={handleDragStart}></div>
    </div>
  );
}
