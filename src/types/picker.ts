import { ID, Tile } from './general';

export interface PickerState { // STORE
  tileset: ID | undefined;
  tile: Tile | undefined;
  tiles: Tile[] | undefined;
}
