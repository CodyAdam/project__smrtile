import { Tag } from '../../features/browser/browserTypes';
import styles from './TagsDisplay.module.css';
import { SquareButton } from '../squareButton/SquareButton';

export function TagsDisplay({
  tags,
  onChange,
  className,
}: {
  tags: Tag[];
  onChange?: (newTags: Tag[]) => void;
  className?: string;
}) {
  function handleRemove(index: number) {
    if (onChange) {
      let newTags = [...tags];
      newTags.splice(index, 1);
      onChange(newTags);
    }
  }

  function copyTags() {
    navigator.clipboard.writeText(tags.map((tag) => tag.name).join(' ') + ' ');
  }

  function clear() {
    if (onChange) onChange([]);
  }

  if (tags.length) {
    return (
      <div className={`${className} ${styles.container}`}>
        {tags.map((tag: Tag, index: number) => (
          <div
            key={index}
            className={`${styles.tag} ${onChange ? styles.removable : ''}`}
            style={{ backgroundColor: tag.color }}
            onClick={() => {
              handleRemove(index);
            }}
          >
            <span>{tag.name}</span>
            {onChange ? <div className={`icon icon-trash`} /> : null}
          </div>
        ))}
        <SquareButton title='copy' onClick={copyTags} className={`${styles.button} ${styles.copyContainer}`}>
          <div>
            <div className={`icon icon-copy ${styles.copy}`}></div>
            <div className={`icon icon-check ${styles.check}`}></div>
          </div>
        </SquareButton>
        <SquareButton title='clear' icon='clear-all' onClick={clear} className={styles.button} />
      </div>
    );
  } else
    return (
      <div className={`${className} ${styles.container}`}>
        <div className={styles.placeholder}>There are no tags yet</div>
      </div>
    );
}
