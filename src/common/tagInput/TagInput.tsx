import styles from './TagInput.module.css';
import { useState, useEffect } from 'react';
import { ObjectType, Tag } from '../../features/browser/browserTypes';
import SmallSquareButton from '../smallSquareButton/SmallSquareButton';

export function TagInput({
  tags,
  onChange,
  className,
}: {
  tags: Tag[];
  onChange: (newTags: Tag[]) => void;
  className?: string;
}) {
  const [value, setValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const tagsSuggestion: Tag[] = [
    { type: ObjectType.TAG, color: '#a28d30', name: 'yellow' },
    { type: ObjectType.TAG, color: '#a02034', name: 'red' },
    { type: ObjectType.TAG, color: '#2e8456', name: 'green' },
  ];

  function handleAdd(toAdd: Tag[]) {
    toAdd = toAdd.filter((tag) => isValid(tag.name) && !tags.map((tag) => tag.name).includes(tag.name));
    if (toAdd.length) {
      const newTags = [...tags, ...toAdd].sort((tag1, tag2) => tag1.name.localeCompare(tag2.name));
      onChange(newTags);
    }
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
    let output: Tag = { type: ObjectType.TAG, name: str };
    //check if is global tag
    tagsSuggestion.forEach((tag) => {
      if (tag.name === str) output = tag;
    });
    return output;
  }

  useEffect(() => {
    setIsInputValid(isValid(value));
  }, [value]);

  const suggestion = tagsSuggestion
    .filter((tag) => !tags.map((tag) => tag.name).includes(tag.name))
    .map((tag: Tag, index: number) => (
      <button
        key={index + tag.name}
        className={styles.suggestionTag}
        style={{ backgroundColor: tag.color }}
        onClick={() => {
          handleAdd([tag]);
        }}
        tabIndex={0}
      >
        <div className={`icon icon-add ${styles.add}`}></div>
        <span>{tag.name}</span>
      </button>
    ));

  return (
    <div className={`${className} ${styles.container}`}>
      <input
        placeholder='Add tag'
        value={value}
        className={`${styles.input} ${!isInputValid && value !== '' ? styles.invalid : ''}`}
        type='text'
        spellCheck='false'
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isInputValid) handleAdd([stringToTag(value)]);
        }}
        onChange={handleChange}
        autoFocus
      />
      {suggestion}
    </div>
  );
}
