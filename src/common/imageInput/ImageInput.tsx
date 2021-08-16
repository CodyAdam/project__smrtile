import { Sprite } from '../../app/globalTypes';
import styles from './ImageInput.module.css';

export function ImageInput({ onChange }: { onChange: (sprite: Sprite) => void }) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      const url = window.URL.createObjectURL(file);
      const image = new Image();
      image.src = url;
      image.onload = () => {
        onChange({ url: url, width: image.width, height: image.height });
      };
    }
  }

  return (
    <div className={styles.container}>
      <input type='file' onChange={handleChange} accept='image/png' />
    </div>
  );
}
