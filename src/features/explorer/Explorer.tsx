import styles from './Explorer.module.css';
import { nanoid } from 'nanoid';
import { SquareButton } from '../../common/squareButton/SquareButton';
import { add, smartTilesSelector, tilesetsSelector, selectedSelector, select } from './explorerSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ObjTypes, SmartBrush, Tileset } from '../../app/globalTypes';
import { BrowsingGroup } from '../../common/browsingGroup/BrowsingGroup';
import { Card } from '../../common/card/Card';
import { HorizontalSize, ResizeVertical, VerticalSize } from '../../common/resize/Resizable';
import { useEffect, useState } from 'react';

export function Explorer({ horizontalSize }: { horizontalSize: HorizontalSize }) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedSelector);
  const [horizontal, setHorizontal] = useState<HorizontalSize>(horizontalSize);
  const [vertical, setVertical] = useState<VerticalSize>({ top: 0, bottom: 0 });

  useEffect(() => {
    setHorizontal(horizontalSize);
  }, [horizontalSize]);

  const smartBrushes = useAppSelector(smartTilesSelector);
  let smartTilesContent = null;
  if (smartBrushes)
    smartTilesContent = smartBrushes
      .sort((val1, val2) => val2.sortOrder.index - val1.sortOrder.index)
      .map((smartBrush: SmartBrush) => {
        const isSelected = !!selected && selected.type === smartBrush.type && selected.id === smartBrush.id;
        return (
          <Card
            key={smartBrush.id}
            object={smartBrush}
            selected={isSelected}
            onClick={() => {
              if (selected && selected.id !== smartBrush.id) dispatch(select(smartBrush));
            }}
          />
        );
      });

  const tilesets = useAppSelector(tilesetsSelector);
  let tilesetsContent = null;
  let tilesetsPreview = null;
  if (tilesets) {
    tilesetsContent = tilesets
      .sort((val1, val2) => val2.sortOrder.index - val1.sortOrder.index)
      .map((tileset: Tileset, index) => {
        const isSelected = !!selected && selected.type === tileset.type && selected.id === tileset.id;
        return (
          <Card
            key={tileset.id}
            object={tileset}
            selected={isSelected}
            onClick={() => {
              if (selected && selected.id !== tileset.id) dispatch(select(tileset));
            }}
          />
        );
      });
  }

  return (
    <ResizeVertical
      min={4}
      max={96}
      onResize={(value) => {
        if (vertical.bottom !== value.bottom && vertical.top !== value.top) setVertical(value);
      }}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <span>EXPLORER</span>
          <SquareButton icon='tag' onClick={() => {}} title='filter' />
        </div>
        <div className={styles.scrollable}>
          <BrowsingGroup
            title='smart brushes'
            onAdd={() => {
              dispatch(add({ type: ObjTypes.SMART_BRUSH, id: nanoid() }));
            }}
          >
            {smartTilesContent}
          </BrowsingGroup>
          <BrowsingGroup
            title='tilesets'
            onAdd={() => {
              dispatch(add({ type: ObjTypes.TILESET, id: nanoid() }));
            }}
          >
            {tilesetsContent}
            {tilesetsPreview}
          </BrowsingGroup>
        </div>
      </div>
      <div className={`${styles.container} ${styles.borderTop}`}>
        <div className={styles.title}>
          <span>TILE PICKER</span>
          <SquareButton icon='tag' onClick={() => {}} title='filter' />
        </div>
        <div>
          tile picker goes here!
          <br />
          {JSON.stringify(Math.round(vertical.bottom))}
          <br />
          {JSON.stringify(Math.round(horizontal.left))}
        </div>
      </div>
    </ResizeVertical>
  );
}
