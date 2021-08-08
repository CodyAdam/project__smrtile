import { useAppSelector } from '../../app/hooks';
import { selectedContentSelector } from '../browser/browserSlice';
import { ObjectType } from '../browser/browserTypes';
import styles from './EditingPanel.module.css';
import { RulePanel } from './RulePanel';

export function EditingPanel() {
  const selected = useAppSelector(selectedContentSelector);

  if (!selected)
    return <div className={`${styles.placeholder}`}>Select an element inside the Browser or add a new element</div>;
  switch (selected.type) {
    case ObjectType.RULE:
      return <RulePanel selected={selected} />;
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
      return (
        <div>
          <h1>NOT YET IMPLEMENTED</h1>
          <article>
            <h2>Soon</h2>
            <p>Soon</p>
          </article>
        </div>
      );
  }
}
