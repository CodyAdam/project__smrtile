import styles from './Editing.module.css';
import { Tileset, TilesetFilter } from '../../../types/general';
import { Propertie } from '../../../components/propertie/Propertie';
import { ImageInput } from '../../../components/imageInput/ImageInput';
import { useAppDispatch } from '../../../redux/hooks';
import { update } from '../../../redux/explorerSlice';
import { CheckboxInput } from '../../../components/checkboxInput/CheckboxInput';
import { GridSetter, isUsingOffset } from './modal/grid/GridSetter';
import { useState } from 'react';
import { TagsDisplay } from '../../../components/tags/TagsDisplay';
import { TagInput } from '../../../components/tags/TagInput';
import { Modal } from './modal/Modal';
import { ActionCreators } from 'redux-undo';
import { NumberInput } from '../../../components/numberInput/NumberInput';
import { TextButton } from '../../../components/textButton/TextButton';
import { TextInput } from '../../../components/textInput/TextInput';

export function TilesetPanel({ selected }: { selected: Tileset }) {
  const dispatch = useAppDispatch();
  const [showGridModal, setShowGrid] = useState(false);

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
      <div className={`${styles.subContainer} ${showGridModal ? styles.blurred : ''}`}>
        <h1>Tileset</h1>
        <Propertie name='Name'>
          <TextInput
            onChange={(name) => {
              dispatch(update({ target: selected, changes: { name: name } }));
            }}
            text={selected.name}
          />
        </Propertie>
        <Propertie name='Import image'>
          <ImageInput
            onChange={(imageData) => {
              if (selected.image) window.URL.revokeObjectURL(selected.image.url);
              dispatch(
                update({
                  target: selected,
                  changes: {
                    image: imageData,
                    grid: {
                      columns: 0,
                      height: 0,
                      width: 0,
                      rows: 0,
                      offset: { bottom: 0, left: 0, right: 0, top: 0 },
                    },
                  },
                }),
              );
              dispatch(ActionCreators.clearHistory());
            }}
          />
        </Propertie>
        <Propertie name='Grid'>
          <TextButton
            title='Edit'
            invalid={!selected.image}
            onClick={() => {
              setShowGrid(true);
            }}
          />
          <div className={styles.row} style={{ gap: '20px' }}>
            <div className={`${styles.column}`}>
              <div className={`${styles.row} ${styles.end}`}>
                Colums: <NumberInput value={selected.grid.columns} fixed />
              </div>
              <div className={`${styles.row} ${styles.end}`}>
                Tile width:
                <NumberInput value={selected.grid.width} fixed />
              </div>
            </div>
            <div className={`${styles.column}`}>
              <div className={`${styles.row} ${styles.end}`}>
                Rows:
                <NumberInput value={selected.grid.rows} fixed />
              </div>
              <div className={`${styles.row} ${styles.end}`}>
                Tile height:
                <NumberInput value={selected.grid.height} fixed />
              </div>
            </div>
          </div>
          {!isUsingOffset(selected.grid) ? null : (
            <div className={styles.row} style={{ gap: '20px' }}>
              <div className={`${styles.column}`}>
                <div className={`${styles.row} ${styles.end}`}>
                  Colums: <NumberInput value={selected.grid.columns} fixed />
                </div>
                <div className={`${styles.row} ${styles.end}`}>
                  Tile width:
                  <NumberInput value={selected.grid.width} fixed />
                </div>
              </div>
              <div className={`${styles.column}`}>
                <div className={`${styles.row} ${styles.end}`}>
                  Rows:
                  <NumberInput value={selected.grid.rows} fixed />
                </div>
                <div className={`${styles.row} ${styles.end}`}>
                  Tile height:
                  <NumberInput value={selected.grid.height} fixed />
                </div>
              </div>
            </div>
          )}
        </Propertie>
        <Propertie
          name='Filters'
          about='Add filters to your tileset for display purpose\nChoose whether or not the image should be pixelated'
        >
          <CheckboxInput
            title='Pixel perfect'
            value={selected.filters.includes('pixelated')}
            onChange={(value) => {
              dispatch(update({ target: selected, changes: { filters: setFilter('pixelated', value) } }));
            }}
          />
        </Propertie>
        <Propertie name='Tags'>
          <>
            <TagsDisplay
              tags={selected.tags}
              onChange={(tags) => {
                dispatch(update({ target: selected, changes: { tags: tags } }));
              }}
            />
            <TagInput
              tags={selected.tags}
              onChange={(tags) => {
                dispatch(update({ target: selected, changes: { tags: tags } }));
              }}
            />
          </>
        </Propertie>
      </div>
      {showGridModal ? (
        <Modal
          onCancel={() => {
            setShowGrid(false);
          }}
        >
          <GridSetter selected={selected}></GridSetter>
        </Modal>
      ) : null}
    </div>
  );
}
