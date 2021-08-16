import { useAppSelector } from '../../../app/hooks';
import { selectedContentSelector } from '../browserSlice';
import { ObjectType } from '../browserTypes';
import styles from './EditingPanel.module.css';
import { RulePanel } from './RulePanel';
import { TilesetPanel } from './TilesetPanel';

export function EditingPanel() {
  const selected = useAppSelector(selectedContentSelector);

  if (!selected)
    return <div className={`${styles.placeholder}`}>Select an element inside the Browser or add a new element</div>;
  switch (selected.type) {
    case ObjectType.RULE:
      return <RulePanel key={selected.id} selected={selected} />;
    case ObjectType.SMARTTILE:
      return (
        <div>
          <h1>NOT YET IMPLEMENTED</h1>
          <article>
            <h2>Soon</h2>
            <p>Soon</p>
          </article>
        </div>
      );
    case ObjectType.TILESET:
      return <TilesetPanel key={selected.id} selected={selected} />;
  }
}
