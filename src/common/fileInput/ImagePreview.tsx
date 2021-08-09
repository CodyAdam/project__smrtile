import { TilesetFilter } from '../../features/browser/browserTypes';
import styles from './ImagePreview.module.css';

export function ImagePreview({ imageUrl, filters }: { imageUrl?: string; filters?: TilesetFilter[] }) {
  if (imageUrl) {
    const filterClasses = filters ? (filters.includes('pixelated') ? styles.pixelated : '') : '';
    return (
      <div className={styles.container}>
        <img className={`${styles.img} ${filterClasses}`} src={imageUrl} alt='' />
      </div>
    );
  } else
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>There is no tileset to display yet</div>
      </div>
    );
}
