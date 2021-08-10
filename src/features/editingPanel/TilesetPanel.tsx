import styles from './Panel.module.css';
import { Tileset, TilesetFilter } from '../browser/browserTypes';
import { Propertie } from '../../common/propertie/Propertie';
import { ImageInput } from '../../common/fileInput/ImageInput';
import { ImagePreview } from '../../common/fileInput/ImagePreview';
import { useAppDispatch } from '../../app/hooks';
import { updateTileset } from '../browser/browserSlice';
import { CheckboxInput } from '../../common/checkboxInput/CheckboxInput';
import { GridSetter } from './GridSettings';

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
        <ImageInput
          onChange={(sprite) => {
            //TODO
            // if (selected.imageUrl) window.URL.revokeObjectURL(selected.imageUrl);
            dispatch(updateTileset({ id: selected.id, changes: { sprite: sprite } }));
          }}
        />
      </Propertie>
      <Propertie name='Preview'>
        <ImagePreview sprite={selected.sprite} filters={selected.filters} />
      </Propertie>
      <Propertie name='Grid' about='Set the grid layout size\nDesc TODO'>
        <GridSetter selected={selected} />
      </Propertie>
      <Propertie
        name='Filters'
        about='Add filters to your tileset for display purpose\nChoose whether or not the image should be pixelated'
      >
        <CheckboxInput
          title='Pixelated'
          value={selected.filters.includes('pixelated')}
          onChange={(value) => {
            dispatch(updateTileset({ id: selected.id, changes: { filters: setFilter('pixelated', value) } }));
          }}
        />
      </Propertie>
    </div>
  );
}
