import { TilesetFilter } from '../../features/browser/browserTypes';
import styles from './ImagePreview.module.css';
import { useState } from 'react';

export function ImagePreview({ imageUrl, filters }: { imageUrl?: string; filters?: TilesetFilter[] }) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    setSize({ width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight });
  }

  if (imageUrl) {
    const filterClasses = filters ? (filters.includes('pixelated') ? styles.pixelated : '') : '';
    return (
      <>
        <div className={styles.container}>
          <img onLoad={handleImageLoad} className={`${styles.img} ${filterClasses}`} src={imageUrl} alt='' />
        </div>
        {size ? (
          <div className={styles.sizeLabel}>
            Image size: <b>{size.width}</b> x <b>{size.height}</b>
          </div>
        ) : null}
      </>
    );
  } else
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>There is no tileset to display yet</div>
      </div>
    );
}
