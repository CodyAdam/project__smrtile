import styles from './Explorer.module.css';
import { nanoid } from 'nanoid';
import { SquareButton } from '../../../common/squareButton/SquareButton';
import { add, rulesSelector, smartTilesSelector, tilesetsSelector, selectedSelector, select } from './explorerSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ObjectType, Rule, SmartTile, Tileset } from '../../../app/globalTypes';
import { BrowsingGroup } from '../../../common/browsingGroup/BrowsingGroup';
import { Card } from '../../../common/card/Card';

export function Explorer() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedSelector);

  const rules = useAppSelector(rulesSelector);
  let rulesContent = null;
  if (rules)
    rulesContent = rules.map((rule: Rule) => {
      const isSelected = !!selected && selected.type === rule.type && selected.id === rule.id;
      return (
        <Card
          key={rule.id}
          object={rule}
          selected={isSelected}
          onClick={() => {
            dispatch(select(rule));
          }}
        />
      );
    });

  const smartTiles = useAppSelector(smartTilesSelector);
  let smartTilesContent = null;
  if (smartTiles)
    smartTilesContent = smartTiles.map((smartTile: SmartTile) => {
      const isSelected = !!selected && selected.type === smartTile.type && selected.id === smartTile.id;
      return (
        <Card
          key={smartTile.id}
          object={smartTile}
          selected={isSelected}
          onClick={() => {
            dispatch(select(smartTile));
          }}
        />
      );
    });

  const tilesets = useAppSelector(tilesetsSelector);
  let tilesetsContent = null;
  let tilesetsPreview = null;
  if (tilesets) {
    tilesetsContent = tilesets.map((tileset: Tileset, index) => {
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
          title='rules'
          onAdd={() => {
            dispatch(add({ type: ObjectType.RULE, id: nanoid() }));
          }}
        >
          {rulesContent}
        </BrowsingGroup>
        <BrowsingGroup
          title='smart tiles'
          onAdd={() => {
            dispatch(add({ type: ObjectType.SMARTTILE, id: nanoid() }));
          }}
        >
          {smartTilesContent}
        </BrowsingGroup>
        <BrowsingGroup
          title='tilesets'
          onAdd={() => {
            dispatch(add({ type: ObjectType.TILESET, id: nanoid() }));
          }}
        >
          {tilesetsContent}
          {tilesetsPreview}
        </BrowsingGroup>
      </div>
    </div>
  );
}
