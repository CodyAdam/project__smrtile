import styles from './Explorer.module.css';
import { nanoid } from 'nanoid';
import { SquareButton } from '../../../common/squareButton/SquareButton';
import { add, smartTilesSelector, tilesetsSelector, selectedSelector, select } from './explorerSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ObjTypes, SmartBrush, AssetTileset } from '../../../app/globalTypes';
import { BrowsingGroup } from '../../../common/browsingGroup/BrowsingGroup';
import { Card } from '../../../common/card/Card';

export function Explorer() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedSelector);

  const smartBrushes = useAppSelector(smartTilesSelector);
  let smartTilesContent = null;
  if (smartBrushes)
    smartTilesContent = smartBrushes.map((smartBrush: SmartBrush) => {
      const isSelected = !!selected && selected.type === smartBrush.type && selected.id === smartBrush.id;
      return (
        <Card
          key={smartBrush.id}
          object={smartBrush}
          selected={isSelected}
          onClick={() => {
            dispatch(select(smartBrush));
          }}
        />
      );
    });

  const tilesets = useAppSelector(tilesetsSelector);
  let tilesetsContent = null;
  let tilesetsPreview = null;
  if (tilesets) {
    tilesetsContent = tilesets.map((tileset: AssetTileset, index) => {
      const isSelected = !!selected && selected.type === tileset.type && selected.id === tileset.id;
      return (
        <Card
          key={tileset.id}
          object={tileset}
          selected={isSelected}
          onClick={() => {
            dispatch(select(tileset));
          }}
        />
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>EXPLORER</span>
        <SquareButton icon='tag' onClick={() => {}} title='filter' />
      </div>
      <div className={styles.scrollable}>
        <BrowsingGroup
          title='smart brushes'
          onAdd={() => {
            dispatch(add({ type: ObjTypes.SMARTBRUSH, id: nanoid() }));
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
  );
}