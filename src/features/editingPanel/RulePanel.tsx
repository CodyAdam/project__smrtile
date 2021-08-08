import { useAppDispatch } from '../../app/hooks';
import { TagsDisplay } from '../../common/tagInput/TagsDisplay';
import { TagInput } from '../../common/tagInput/TagInput';
import { TextInput } from '../../common/textInput/TextInput';
import { updateRule } from '../browser/browserSlice';
import { Rule, SmartTile, Tileset } from '../browser/browserTypes';
import { Propertie } from '../../common/propertie/Propertie';
import styles from './RulePanel.module.css';

export function RulePanel({ selected }: { selected: Rule | SmartTile | Tileset }) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <h1>Rule</h1>
      <Propertie name='Name' about='this is the name'>
        <TextInput
          key={selected.name}
          text={selected.name}
          onChange={(newName) => {
            dispatch(updateRule({ id: selected.id, changes: { name: newName } }));
          }}
        />
      </Propertie>
      <Propertie name='Tags'>
        <>
          <TagsDisplay
            tags={selected.tags}
            onChange={(newTags) => {
              dispatch(updateRule({ id: selected.id, changes: { tags: newTags } }));
            }}
          />
          <TagInput
            className={styles.tagInput}
            tags={selected.tags}
            onChange={(newTags) => {
              dispatch(updateRule({ id: selected.id, changes: { tags: newTags } }));
            }}
          />
        </>
      </Propertie>
      <Propertie name='Properties'>
        <input type='checkbox' name='' id='' />
      </Propertie>
    </div>
  );
}
