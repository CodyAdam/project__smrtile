import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './Browser.module.css';
import { SquareButton } from '../../common/squareButton/SquareButton';
import {
  addRule,
  addSmartTile,
  addTileset,
  rulesSelector,
  smartTilesSelector,
  tilesetsSelector,
  selectedSelector,
  select,
} from './browserSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ID, Rule, SmartTile, Tileset } from './browserTypes';
import { TilesetPreview } from '../../common/tilesetPreview/TilesetPreview';
import { BrowsingGroup } from '../../common/browsingGroup/BrowsingGroup';

export function Browser() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedSelector);

  const rules = useAppSelector(rulesSelector);
  let rulesContent = null;
  if (rules)
    rulesContent = rules.map((rule: Rule) => {
      const isSelected = selected && selected.type === rule.type && selected.id === rule.id;
      return (
        <div
          key={rule.id}
          className={`${styles.ruleCard} ${isSelected ? styles.selectedCard : ''}`}
          onClick={() => {
            dispatch(select(rule));
          }}
        >
          {rule.name.substring(0, 2).toUpperCase()}
        </div>
      );
    });

  const smartTiles = useAppSelector(smartTilesSelector);
  let smartTilesContent = null;
  if (smartTiles)
    smartTilesContent = smartTiles.map((smartTile: SmartTile) => {
      const isSelected = selected && selected.type === smartTile.type && selected.id === smartTile.id;
      return (
        <div
          key={smartTile.id}
          className={`${styles.smartTileCard} ${isSelected ? styles.selectedCard : ''}`}
          onClick={() => {
            dispatch(select(smartTile));
          }}
        >
          {smartTile.name.substring(0, 2).toUpperCase()}
        </div>
      );
    });

  const [expanded, setExpanded] = useState<ID[]>([]);
  const tilesets = useAppSelector(tilesetsSelector);
  let tilesetsContent = null;
  let tilesetsPreview = null;
  if (tilesets) {
    tilesetsContent = tilesets.map((tileset: Tileset) => {
      const isSelected = selected && selected.type === tileset.type && selected.id === tileset.id;
      return (
        <div
          key={tileset.id}
          className={`${styles.tilesetCard} ${isSelected ? styles.selectedCard : ''}`}
          onClick={() => {
            dispatch(select(tileset));
          }}
          onDoubleClick={() => {
            if (expanded.includes(tileset.id)) setExpanded([...expanded].filter((id) => id !== tileset.id));
            else setExpanded([...expanded, tileset.id]);
          }}
        >
          {tileset.name.substring(0, 2).toUpperCase()}
        </div>
      );
    });
    tilesetsPreview = tilesets.map((tileset: Tileset) => {
      if (expanded.includes(tileset.id))
        return (
          <TilesetPreview filters={tileset.filters} grid={tileset.grid} showGrid={false} sprite={tileset.sprite} />
        );
      else return null;
    });
  }

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
        <SquareButton icon='tag' onClick={() => {}} title='filter' />
      </div>
      <div className={styles.scrollable}>
        <BrowsingGroup
          title='rules'
          onAdd={() => {
            dispatch(addRule(nanoid()));
          }}
        >
          {rulesContent}
        </BrowsingGroup>
        <BrowsingGroup
          title='smart tiles'
          onAdd={() => {
            dispatch(addSmartTile(nanoid()));
          }}
        >
          {smartTilesContent}
        </BrowsingGroup>
        <BrowsingGroup
          title='tilesets'
          onAdd={() => {
            dispatch(addTileset(nanoid()));
          }}
        >
          {tilesetsContent}
          {tilesetsPreview}
        </BrowsingGroup>
      </div>
      <div className={styles.resizeBar} onMouseDown={handleDragStart}></div>
    </div>
  );
}
