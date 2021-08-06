import styles from './TagInput.module.css';
import { useState, useEffect } from 'react';
import { ObjectType, Tag } from '../../features/browser/browserTypes';

export function TagInput({ tags, onChange }: { tags: Tag[]; onChange: (newTags: Tag[]) => void }) {
  const [tagsState, setTagsState] = useState(tags);
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  function handleAdd(toAdd: Tag[]) {
    toAdd = toAdd.filter((tag) => isValid(tag.name) && !tagsState.map((tag) => tag.name).includes(tag.name));
    if (toAdd.length) {
      const newTags = [...tagsState, ...toAdd].sort();
      setTagsState(newTags);
      onChange(newTags);
    }
    setValue('');
  }
  function handleRemove(index: number) {
    if (index >= tagsState.length) return;
    let newTags = [...tagsState];
    newTags.splice(index, 1);
    setTagsState(newTags);
    onChange(newTags);
  }

  function handleCancel() {
    setIsTyping(false);
    setValue('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value;
    newValue = newValue.toLocaleLowerCase();
    const splited = newValue.split(' ');

    if (splited.length > 1) handleAdd(splited.map(stringToTag));
    else setValue(splited[0].substr(0, 20));
  }

  function isValid(str: string): boolean {
    const regexr = /^(([A-Z]|[a-z]|\d)([A-Z]|[a-z]|(_|-)|\d)?){0,19}([A-Z]|[a-z]|\d)$/;
    return regexr.test(str);
  }

  function stringToTag(str: string): Tag {
    return { type: ObjectType.TAG, name: str };
  }

  useEffect(() => {
    setIsInputValid(isValid(value));
  }, [value]);

  const tagsRender = tagsState.map((tag: Tag, index: number) => (
    <div
      key={index + tag.name}
      className={styles.tag}
      style={{ backgroundColor: tag.color }}
      onClick={() => {
        handleRemove(index);
      }}
    >
      {tag.name}
    </div>
  ));

  let addInput = (
    <button
      onClick={() => {
        setIsTyping(true);
      }}
      className={styles.addButton}
    >
      Add
    </button>
  );
  if (isTyping)
    addInput = (
      <input
        value={value}
        className={`${styles.input} ${!isInputValid ? styles.invalid : ''}`}
        type='text'
        spellCheck='false'
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || /\s/g.test(e.key)) && isInputValid) handleAdd([stringToTag(value)]);
          else if (e.key === 'Escape') handleCancel();
        }}
        onBlur={handleCancel}
        onChange={handleChange}
        autoFocus
      />
    );
  return (
    <div className={styles.container}>
      {tagsRender}
      {addInput}
    </div>
  );
}
