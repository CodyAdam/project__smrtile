import { Tileset, TilesetFilter } from '../browser/browserTypes';
import styles from './Panel.module.css';
import { Propertie } from '../../common/propertie/Propertie';
import { ImageInput } from '../../common/fileInput/ImageInput';
import { ImagePreview } from '../../common/fileInput/ImagePreview';
import { useAppDispatch } from '../../app/hooks';
import { updateTileset } from '../browser/browserSlice';
import { CheckboxInput } from '../../common/checkboxInput/CheckboxInput';
import { TextButton } from '../../common/textButton/TextButton';
import { NumberInput } from '../../common/numberInput/NumberInput';

export function TilesetPanel({ selected }: { selected: Tileset }) {
  const dispatch = useAppDispatch();

  function setFilter(filter: TilesetFilter, value: boolean): TilesetFilter[] {
    const filters = [...selected.filters];
    if (value) return Array.from(new Set([...filters, filter]));
    else if (filters.includes(filter)) {
      filters.splice(filters.indexOf(filter), 1);
      return filters;
    } else return filters;
  }

  return (
    <div className={styles.container}>
      <h1>Tileset</h1>
      <Propertie name='Import image' about='Upload the tilesheet image for the tileset'>
        <>
          <ImageInput
            onChange={(imageData) => {
              if (selected.imageUrl) window.URL.revokeObjectURL(selected.imageUrl);
              dispatch(updateTileset({ id: selected.id, changes: { imageUrl: imageData } }));
            }}
          />
        </>
      </Propertie>
      <Propertie name='Preview'>
        <ImagePreview imageUrl={selected.imageUrl} filters={selected.filters} />
      </Propertie>
      <Propertie name='Grid' about='Set the grid layout size\nDesc TODO'>
        <>
          <div className={styles.grid}>
            <div className={styles.column}>
              <NumberInput title='Rows' />
              <NumberInput title='Width' />
            </div>
            <div className={styles.column}>
              <NumberInput title='Columns' />
              <NumberInput title='Height' />
            </div>
          </div>
          <TextButton title='Apply' onClick={() => {}} />
        </>
      </Propertie>
      <Propertie
        name='Filters'
        about='Add filters to your tileset for display purpose\nChoose whether or not the image should be pixelated'
      >
        <>
          <CheckboxInput
            value={selected.filters.includes('pixelated')}
            onChange={(value) => {
              dispatch(updateTileset({ id: selected.id, changes: { filters: setFilter('pixelated', value) } }));
            }}
          />
          <span>Pixelated</span>
        </>
      </Propertie>
    </div>
  );
}
