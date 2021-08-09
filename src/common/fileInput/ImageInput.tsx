import styles from './ImageInput.module.css';

export function ImageInput({ onChange }: { onChange: (imageUrl: string) => void }) {
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      onChange(window.URL.createObjectURL(file));
    }
  }

  return (
    <div className={styles.container}>
      <input type='file' onChange={handleChange} accept='image/png' />
    </div>
  );
}
