import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './Browser.module.css';
import SmallSquareButton from '../../common/smallSquareButton/SmallSquareButton';
import { addRule, addSmartTile, addTileset } from './browserSlice';
import { useAppDispatch } from '../../app/hooks';

export function Browser() {
  const dispatch = useAppDispatch();

  const [showRules, setShowRules] = useState(false);
  const [showSmartTiles, setShowSmartTiles] = useState(false);
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
        <div className={styles.group}>
          <button
            className={styles.groupLabel}
            onClick={() => {
              setShowSmartTiles(!showSmartTiles);
            }}
          >
            <div className={styles.expandIcon}>
              <div className={`${showSmartTiles ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
            </div>
            <span>SMART TILES</span>
            <div className={styles.spacer} />
            <SmallSquareButton
              onClick={() => {
                dispatch(addSmartTile(nanoid()));
              }}
            >
              <div className={`icon icon-add`} />
            </SmallSquareButton>
          </button>
          <div className={styles.groupContent} hidden={!showSmartTiles}>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
            <button>AB</button>
          </div>
        </div>
        <div className={styles.group}>
          <button
            className={styles.groupLabel}
            onClick={() => {
              setShowTilesets(!showTilesets);
            }}
          >
            <div className={styles.expandIcon}>
              <div className={`${showTilesets ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
            </div>
            <span>TILESETS</span>
            <div className={styles.spacer} />
            <SmallSquareButton
              onClick={() => {
                dispatch(addTileset(nanoid()));
              }}
            >
              <div className={`icon icon-add`} />
            </SmallSquareButton>
          </button>
          <div className={styles.groupContent} hidden={!showTilesets}>
            <button>TS1</button>
            <button>TS2</button>
            <button>TS3</button>
            <button>TS4</button>
          </div>
        </div>
      </div>
      <div className={styles.resizeBar} onMouseDown={handleDragStart}></div>
    </div>
  );
}
