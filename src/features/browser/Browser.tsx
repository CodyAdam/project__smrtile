import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './Browser.module.css';
import SmallSquareButton from '../../common/smallSquareButton/SmallSquareButton';
import { addRule } from './browserSlice';
import { useAppDispatch } from '../../app/hooks';

export function Browser() {
  const [showRules, setShowRules] = useState(false);
  const [showBrushes, setShowBrushes] = useState(false);
  const [showTilesets, setShowTilesets] = useState(false);
  const [width, setWidth] = useState(300);
  let lastWidth = width;
  let lastPos: number = 0;
  const dispatch = useAppDispatch();

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
            className={styles.groupLabel}
            onClick={() => {
              setShowRules(!showRules);
            }}
          >
            <div className={styles.expandIcon}>
              <div className={`${showRules ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
            </div>
            <span>RULES</span>
            <div className={styles.spacer} />
            <SmallSquareButton
              onClick={() => {
                dispatch(addRule(nanoid()));
              }}
            >
              <div className={`icon icon-add`} />
            </SmallSquareButton>
          </button>
          <div className={styles.groupContent} hidden={!showRules}>
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
