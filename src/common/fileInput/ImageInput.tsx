import styles from './ImageInput.module.css';
import { useState } from 'react';

export function ImageInput({ onChange }: { onChange: (imageData: string) => void }) {
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const file = files.item(0);
      if (file) {
        toBase64(file)
          .then((imageData) => {
            if (imageData && typeof imageData === 'string') onChange(imageData);
          })
          .catch(() => {
            console.error('Failed to read the file : ' + file.name);
          });
      }
    }
  }

  function toBase64(file: File) {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className={styles.container}>
      <input type='file' onChange={handleChange} accept='image/png' />
    </div>
  );
}
