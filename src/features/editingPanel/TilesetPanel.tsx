import { Tileset } from '../browser/browserTypes';
import styles from './Panel.module.css';
import { Propertie } from '../../common/propertie/Propertie';
import { ImageInput } from '../../common/fileInput/ImageInput';
import { useState } from 'react';
import { ImagePreview } from '../../common/fileInput/ImagePreview';
import { useAppDispatch } from '../../app/hooks';
import { updateTileset } from '../browser/browserSlice';

export function TilesetPanel({ selected }: { selected: Tileset }) {
  const dispatch = useAppDispatch();
  const imageData = selected.image;
  return (
    <div className={styles.container}>
      <h1>Tileset</h1>
      <Propertie name='Tileset file' about='Upload the tilesheet image for the tileset'>
        <>
          <ImageInput
            onChange={(imageData) => {
              dispatch(updateTileset({ id: selected.id, changes: { image: imageData } }));
            }}
          />
          <ImagePreview imageData={imageData} filters={selected.filters} />
        </>
      </Propertie>
    </div>
  );
}
