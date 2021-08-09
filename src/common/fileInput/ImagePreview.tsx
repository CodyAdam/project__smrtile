import { TilesetFilter } from '../../features/browser/browserTypes';
import styles from './ImagePreview.module.css';

export function ImagePreview({ imageData, filters }: { imageData?: string; filters?: TilesetFilter[] }) {
  if (imageData) {
    const filterClasses = filters ? (filters.includes('pixelated') ? styles.pixelated : '') : '';
    return (
      <div className={styles.container}>
        <img className={`${styles.img} ${filterClasses}`} src={imageData} alt='' />
      </div>
    );
  } else
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>There is no tileset to display yet</div>
      </div>
    );
}
