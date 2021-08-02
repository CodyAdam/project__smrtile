import React, { useState, useEffect } from 'react';
import styles from './Browser.module.css';
import { TilesetCreation } from './TilesetCreation';
import SmallSquareButton from '../../common/smallSquareButton/SmallSquareButton';

export function Browser() {
  const [showRules, setShowRules] = useState(false);
  const [showBrushes, setShowBrushes] = useState(false);
  const [showTilesets, setShowTilesets] = useState(false);
  const [width, setWidth] = useState(300);
  let lastWidth = width;
  let lastPos: number = 0;

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
    <div className={styles.container} style={{ width: `${width}px` }}>
      <div className={styles.title}>
        <span>BROWSER</span>
        <div className={styles.spacer} />
        <SmallSquareButton onClick={() => {}}>
          <div className={`icon-tag icon`} />
        </SmallSquareButton>
      </div>
      <div className={styles.scrollable}>
        <div className={styles.group}>
          <button
            className={styles.groupName}
            onClick={() => {
              setShowRules(!showRules);
            }}
          >
            <div className={styles.expandIcon}>
              <div className={`${showRules ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
            </div>
            <span>RULES</span>
            <div className={styles.spacer} />
            <SmallSquareButton onClick={() => {}}>
              <div className={`icon icon-tag`} />
            </SmallSquareButton>
            <TilesetCreation />
          </button>
          <div className={styles.groupContent} hidden={!showRules}>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
          </div>
        </div>
        <div className={styles.group}>
          <button
            className={styles.groupName}
            onClick={() => {
              setShowBrushes(!showBrushes);
            }}
          >
            <div className={styles.expandIcon}>
              <div className={`${showRules ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
            </div>
            <span>BRUSHES</span>
            <div className={styles.spacer} />
            <SmallSquareButton onClick={() => {}}>
              <div className={`icon icon-tag`} />
            </SmallSquareButton>
            <TilesetCreation />
          </button>
          <div className={styles.groupContent} hidden={!showBrushes}>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
          </div>
        </div>
        <div className={styles.group}>
          <button
            className={styles.groupName}
            onClick={() => {
              setShowTilesets(!showTilesets);
            }}
          >
            <div className={styles.expandIcon}>
              <div className={`${showRules ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
            </div>
            <span>TILESETS</span>
            <div className={styles.spacer} />
            <SmallSquareButton onClick={() => {}}>
              <div className={`icon icon-tag`} />
            </SmallSquareButton>
            <TilesetCreation />
          </button>
          <div className={styles.groupContent} hidden={!showTilesets}>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
          </div>
        </div>
      </div>
      <div className={styles.resizeBar} onMouseDown={handleDragStart}></div>
    </div>
  );
}
