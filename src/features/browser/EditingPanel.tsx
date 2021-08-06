import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SmallSquareButton from '../../common/smallSquareButton/SmallSquareButton';
import { TagInput } from '../../common/tagInput/TagInput';
import { TextInput } from '../../common/textInput/TextInput';
import { selectedContentSelector, updateRule } from './browserSlice';
import { ObjectType } from './browserTypes';
import styles from './EditingPanel.module.css';

export function EditingPanel() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedContentSelector);

  function copyTags() {
    if (selected && selected.tags) navigator.clipboard.writeText(selected.tags.map((tag) => tag.name).join(' '));
  }

  if (!selected)
    return (
      <div className={`${styles.container} ${styles.placeholder}`}>
        Select an element inside the Browser or add a new element
      </div>
    );
  switch (selected.type) {
    case ObjectType.RULE:
      return (
        <div className={styles.container}>
          <h1>Rule</h1>
          <div className={styles.group}>
            <h2>Name</h2>
            <p>Chose a name for your rule</p>
            <TextInput
              key={selected.id}
              text={selected.name}
              onChange={(newName) => {
                dispatch(updateRule({ id: selected.id, changes: { name: newName } }));
              }}
            />
          </div>
          <div className={styles.group}>
            <h2>Tags</h2>
            <SmallSquareButton onClick={copyTags} className={styles.smallButton}>
              <div className='icon icon-copy' />
            </SmallSquareButton>
            <p>Chose some tags</p>
            <TagInput
              tags={selected.tags}
              key={selected.id}
              onChange={(newTags) => {
                dispatch(updateRule({ id: selected.id, changes: { tags: newTags } }));
              }}
            />
          </div>
        </div>
      );
    case ObjectType.SMARTTILE:
      return (
        <div className={styles.container}>
          <h1>NOT YET IMPLEMENTED</h1>
          <div className={styles.group}>
            <h2>Soon</h2>
            <p>Soon</p>
          </div>
        </div>
      );
    case ObjectType.TILESET:
      return (
        <div className={styles.container}>
          <h1>NOT YET IMPLEMENTED</h1>
          <div className={styles.group}>
            <h2>Soon</h2>
            <p>Soon</p>
          </div>
        </div>
      );
  }
}
