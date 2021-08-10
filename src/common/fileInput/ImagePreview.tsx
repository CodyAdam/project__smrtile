import { Sprite, TilesetFilter } from '../../features/browser/browserTypes';
import styles from './ImagePreview.module.css';

export function ImagePreview({ sprite, filters }: { sprite?: Sprite | undefined; filters?: TilesetFilter[] }) {
  if (sprite) {
    const filterClasses = filters ? (filters.includes('pixelated') ? styles.pixelated : '') : '';
    return (
      <>
        <div className={styles.container}>
          <img className={`${styles.img} ${filterClasses}`} src={sprite.url} alt='' />
        </div>
        <div className={styles.sizeLabel}>
          Image size: <b>{sprite.width}</b> x <b>{sprite.height}</b>
        </div>
      </>
    );
  } else
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>There is no tileset to display yet</div>
      </div>
    );
}
