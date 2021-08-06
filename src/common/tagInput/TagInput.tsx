import styles from './TagInput.module.css';
import { useState, useEffect } from 'react';
import { ObjectType, Tag } from '../../features/browser/browserTypes';
import SmallSquareButton from '../smallSquareButton/SmallSquareButton';

export function TagInput({ tags, onChange }: { tags: Tag[]; onChange: (newTags: Tag[]) => void }) {
  const [tagsState, setTagsState] = useState(tags);
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const globalTags: Tag[] = [
    { type: ObjectType.TAG, color: '#a28d30', name: 'yellow' },
    { type: ObjectType.TAG, color: '#a02034', name: 'red' },
    { type: ObjectType.TAG, color: '#2e8456', name: 'green' },
  ];

  function handleAdd(toAdd: Tag[]) {
    toAdd = toAdd.filter((tag) => isValid(tag.name) && !tagsState.map((tag) => tag.name).includes(tag.name));
    if (toAdd.length) {
      const newTags = [...tagsState, ...toAdd].sort((tag1, tag2) => tag1.name.localeCompare(tag2.name));
      setTagsState(newTags);
      setHasChanged(true);
    }
    setValue('');
  }
  function handleRemove(index: number) {
    let newTags = [...tagsState];
    newTags.splice(index, 1);
    onChange(newTags); // CAUSE RE-RENDER
  }

  function handleCancel() {
    setIsTyping(false);
    setValue('');
    console.log(hasChanged);

    if (hasChanged) onChange(tagsState); // CAUSE RE-RENDER
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
    let output: Tag = { type: ObjectType.TAG, name: str };
    //check if is global tag
    globalTags.forEach((tag) => {
      if (tag.name === str) output = tag;
    });
    return output;
  }

  useEffect(() => {
    setIsInputValid(isValid(value));
  }, [value]);

  let globalTagsRender = null;

  const tagsRender = tagsState.map((tag: Tag, index: number) => (
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

  let addInput = (
    <SmallSquareButton
      onClick={() => {
        setIsTyping(true);
      }}
      className={styles.addButton}
    >
      <div className='icon icon-add'></div>
    </SmallSquareButton>
  );
  if (isTyping) {
    addInput = (
      <input
        placeholder='Tag name'
        value={value}
        className={`${styles.input} ${!isInputValid ? styles.invalid : ''}`}
        type='text'
        spellCheck='false'
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isInputValid) handleAdd([stringToTag(value)]);
          else if (e.key === 'Escape') handleCancel();
        }}
        onChange={handleChange}
        autoFocus
      />
    );
    globalTagsRender = globalTags
      .filter((tag) => !tagsState.map((tag) => tag.name).includes(tag.name))
      .map((tag: Tag, index: number) => (
        <div
          key={index + tag.name}
          className={styles.recommend}
          style={{ backgroundColor: tag.color }}
          onClick={() => {
            handleAdd([tag]);
          }}
          tabIndex={0}
        >
          <div className={`icon icon-add ${styles.add}`}></div>
          <span>{tag.name}</span>
        </div>
      ));
  }
  return (
    <div className={styles.container} onMouseLeave={handleCancel}>
      {tagsRender}
      {addInput}
      {globalTagsRender}
    </div>
  );
}
