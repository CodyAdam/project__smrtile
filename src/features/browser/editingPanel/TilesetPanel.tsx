import styles from './Panel.module.css';
import { Tileset, TilesetFilter } from '../browserTypes';
import { Propertie } from '../../../common/propertie/Propertie';
import { ImageInput } from '../../../common/imageInput/ImageInput';
import { TilesetPreview } from '../../../common/tilesetPreview/TilesetPreview';
import { useAppDispatch } from '../../../app/hooks';
import { updateTileset } from '../browserSlice';
import { CheckboxInput } from '../../../common/checkboxInput/CheckboxInput';
import { GridSetter } from './GridSetter';
import { useState } from 'react';
import { TagsDisplay } from '../../../common/tags/TagsDisplay';
import { TagInput } from '../../../common/tags/TagInput';

export function TilesetPanel({ selected }: { selected: Tileset }) {
  const dispatch = useAppDispatch();
  const [showGrid, setShowGrid] = useState(true);

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
            dispatch(
              updateTileset({
                id: selected.id,
                changes: {
                  sprite: sprite,
                  grid: { columns: 0, height: 0, width: 0, rows: 0, offset: { bottom: 0, left: 0, right: 0, top: 0 } },
                },
              }),
            );
          }}
        />
      </Propertie>
      <Propertie name='Preview'>
        <>
          <CheckboxInput
            value={showGrid}
            title='Show the grid'
            onChange={(bool) => {
              setShowGrid(bool);
            }}
          />
          <TilesetPreview
            sprite={selected.sprite}
            showGrid={showGrid}
            grid={selected.grid}
            filters={selected.filters}
          />
        </>
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
      <Propertie name='Tags'>
        <>
          <TagsDisplay
            tags={selected.tags}
            onChange={(tags) => {
              dispatch(updateTileset({ id: selected.id, changes: { tags: tags } }));
            }}
          />
          <TagInput
            tags={selected.tags}
            onChange={(tags) => {
              dispatch(updateTileset({ id: selected.id, changes: { tags: tags } }));
            }}
          />
        </>
      </Propertie>
    </div>
  );
}
