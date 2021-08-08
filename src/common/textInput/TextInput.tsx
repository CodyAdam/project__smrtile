import styles from './TextInput.module.css';
import { useState, useEffect } from 'react';

export function TextInput({ text, onChange }: { text: string; onChange: (newValue: string) => void }) {
  const [value, setValue] = useState(text);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // When the input text change we check its validity
    const regexr = /^([A-Z]|[a-z]|\d)([A-Z]|[a-z]|(_|-| )|\d)*([A-Z]|[a-z]|\d)$/;
    setIsValid(value.length >= 2 && value.length <= 25 && regexr.test(value));
  }, [value]);

  function handleSave() {
    if (isValid) onChange(value);
  }

  return (
    <div className={styles.container}>
      <input
        value={value}
        className={`${styles.input} ${!isValid ? styles.invalid : ''}`}
        type='text'
        spellCheck='false'
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
        }}
        onBlur={() => handleSave()}
        onChange={(e) => {
          setValue(e.target.value.substring(0, 25));
        }}
      />
    </div>
  );
}
