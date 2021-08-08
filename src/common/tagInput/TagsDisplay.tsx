import { Tag } from '../../features/browser/browserTypes';
import styles from './TagsDisplay.module.css';
import { SmallSquareButton } from '../smallSquareButton/SmallSquareButton';

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

  if (tags.length) {
    return (
      <div className={`${className} ${styles.container}`}>
        {tags.map((tag: Tag, index: number) => (
          <div
            key={index + tag.name}
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
        <SmallSquareButton onClick={copyTags} className={styles.button}>
          <div>
            <div className={`icon icon-copy ${styles.copy}`}></div>
            <div className={`icon icon-check ${styles.check}`}></div>
          </div>
        </SmallSquareButton>
      </div>
    );
  } else
    return (
      <div className={`${className} ${styles.container}`}>
        <span>There are no tags yet</span>
      </div>
    );
}
