import styles from './Explorer.module.css';
import { nanoid } from 'nanoid';
import { SquareButton } from '../../common/squareButton/SquareButton';
import { add, smartTilesSelector, tilesetsSelector, selectedSelector, select } from './explorerSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ObjTypes, SmartBrush, Tileset } from '../../app/globalTypes';
import { SubGroup } from './subGroup/SubGroup';
import { Card } from './card/Card';
import { HorizontalSize, ResizeVertical, VerticalSize } from '../../common/resize/Resizable';
import { useEffect, useState } from 'react';
import { TilePicker } from './TilePicker';

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
      .sort((val1, val2) => val2.order - val1.order)
      .map((smartBrush: SmartBrush) => {
        const isSelected = !!selected && selected.type === smartBrush.type && selected.id === smartBrush.id;
        return (
          <Card
            key={smartBrush.id}
            object={smartBrush}
            isSelected={isSelected}
            onClick={() => {
              if (!selected || (selected && selected.id !== smartBrush.id)) dispatch(select(smartBrush));
            }}
          />
        );
      });

  const tilesets = useAppSelector(tilesetsSelector);
  let tilesetsContent = null;
  if (tilesets) {
    tilesetsContent = tilesets
      .sort((val1, val2) => val2.order - val1.order)
      .map((tileset: Tileset, index) => {
        const isSelected = !!selected && selected.type === tileset.type && selected.id === tileset.id;
        return (
          <Card
            key={tileset.id}
            object={tileset}
            isSelected={isSelected}
            onClick={() => {
              if (!selected || (selected && selected.id !== tileset.id)) dispatch(select(tileset));
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
          <SquareButton icon='search' onClick={() => {}} title='filter' />
        </div>
        <div className={styles.scrollable}>
          <SubGroup
            title='smart brushes'
            isSelected={!!selected && selected.type === ObjTypes.SMART_BRUSH}
            onAdd={() => {
              dispatch(add({ type: ObjTypes.SMART_BRUSH, id: nanoid() }));
            }}
          >
            {smartTilesContent}
          </SubGroup>
          <SubGroup
            title='tilesets'
            isSelected={!!selected && selected.type === ObjTypes.TILESET}
            onAdd={() => {
              dispatch(add({ type: ObjTypes.TILESET, id: nanoid() }));
            }}
          >
            {tilesetsContent}
          </SubGroup>
        </div>
      </div>
      <div className={`${styles.container} ${styles.borderTop}`}>
        <TilePicker size={{ width: horizontal.left, height: vertical.bottom }} />
      </div>
    </ResizeVertical>
  );
}
