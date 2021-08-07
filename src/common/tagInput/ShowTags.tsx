import { Tag } from '../../features/browser/browserTypes';
import styles from './ShowTags.module.css';

export function ShowTags({ tags, onChange }: { tags: Tag[]; onChange: (newTags: Tag[]) => void }) {
  function handleRemove(index: number) {
    let newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  }

  let tagsRender = [<span>There are no tags yet</span>];
  if (tags.length)
    tagsRender = tags.map((tag: Tag, index: number) => (
      <div
        key={index + tag.name}
        className={styles.tag}
        style={{ backgroundColor: tag.color }}
        onClick={() => {
          handleRemove(index);
        }}
      >
        <span>{tag.name}</span>
        <div className={`icon icon-trash`}></div>
      </div>
    ));
  return <div className={styles.container}>{tagsRender}</div>;
}
