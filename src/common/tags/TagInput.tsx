import styles from './TagInput.module.css';
import { useState, useEffect } from 'react';
import { Tag } from '../../types/globalTypes';

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
    { color: '#cfc72e', name: 'yellow' },
    { color: '#ba273e', name: 'red' },
    { color: '#39b271', name: 'green' },
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
    let output: Tag = { name: str };
    //check if is global tag
    tagsSuggestion.forEach((tag) => {
      if (tag.name === str) output = tag;
    });
    return output;
  }

  useEffect(() => {
    setIsInputValid(isValid(value));
  }, [value]);

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
      />
      {tagsSuggestion
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
        ))}
    </div>
  );
}
