import { EntityState } from '@reduxjs/toolkit';
import { Brush } from './brush';
import { ID, Types } from './general';
import { Tileset } from './tileset';

export interface ExplorerState { // STORE
  brushes: EntityState<Brush>,
  tilesets: EntityState<Tileset>,
  selected: null | EditSelection
}
export type EditSelection = {
  type: EditSelectableTypes,
  id: ID
}
export type EditSelectableTypes = Types.TILESET | Types.BRUSH


