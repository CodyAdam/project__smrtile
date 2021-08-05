import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextInput } from '../../common/textInput/TextInput';
import { selectedContentSelector, updateRule } from './browserSlice';
import { ObjectType } from './browserTypes';
import styles from './EditingPanel.module.css';

export function EditingPanel() {
  const dispatch = useAppDispatch();
  const selectedContent = useAppSelector(selectedContentSelector);

  if (!selectedContent)
    return (
      <div className={`${styles.container} ${styles.placeholder}`}>
        Select an element inside the Browser or add a new element
      </div>
    );
  switch (selectedContent.type) {
    case ObjectType.RULE:
      return (
        <div className={styles.container}>
          <h1>Rule</h1>
          <div className={styles.group}>
            <h2>Name</h2>
            <p>Chose a name for your rule</p>
            <TextInput
              text={selectedContent.name}
              onChange={(newName) => {
                dispatch(updateRule({ id: selectedContent.id, changes: { name: newName } }));
              }}
            />
          </div>
        </div>
      );
    case ObjectType.SMARTTILE:
      return (
        <div className={styles.container}>
          <h1>SMARTTILE</h1>
          <h2>Name</h2>
          <p>Blabla</p>
        </div>
      );
    case ObjectType.TILESET:
      return (
        <div className={styles.container}>
          <h1>TILESET</h1>
          <h2>Name</h2>
          <p>Blabla</p>
        </div>
      );
  }
}
