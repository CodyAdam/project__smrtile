import { useAppDispatch } from '../../app/hooks';
import { TagsDisplay } from '../../common/tagInput/TagsDisplay';
import { TagInput } from '../../common/tagInput/TagInput';
import { TextInput } from '../../common/textInput/TextInput';
import { updateRule } from '../browser/browserSlice';
import { Rule, SmartTile, Tileset } from '../browser/browserTypes';
import styles from './RulePanel.module.css';

export function RulePanel({ selected }: { selected: Rule | SmartTile | Tileset }) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <h1>Rule</h1>
      <article>
        <h2>Name</h2>
        <p>Chose a name for your rule</p>
        <TextInput
          key={selected.name}
          text={selected.name}
          onChange={(newName) => {
            dispatch(updateRule({ id: selected.id, changes: { name: newName } }));
          }}
        />
      </article>
      <article>
        <h2>Name</h2>
        <TextInput
          key={selected.name}
          text={selected.name}
          onChange={(newName) => {
            dispatch(updateRule({ id: selected.id, changes: { name: newName } }));
          }}
        />
      </article>
      <article>
        <h2>DWAj odiwajoi d</h2>
        <TextInput
          key={selected.name}
          text={selected.name}
          onChange={(newName) => {
            dispatch(updateRule({ id: selected.id, changes: { name: newName } }));
          }}
        />
      </article>
      <article>
        <h2>Name</h2>
        <p>Chose a name for your rule</p>
        <TextInput
          key={selected.name}
          text={selected.name}
          onChange={(newName) => {
            dispatch(updateRule({ id: selected.id, changes: { name: newName } }));
          }}
        />
      </article>
      <article>
        <h2>Tags</h2>
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
      </article>
      <article>
        <h2>Properties</h2>
        <input type='checkbox' name='' id='' />
      </article>
    </div>
  );
}
