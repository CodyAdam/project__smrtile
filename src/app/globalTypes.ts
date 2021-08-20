import { EntityState } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

//////////////////////////////////////////////////////////////////////////
// HISTORY
//////////////////////////////////////////////////////////////////////////

export enum ExplorerHistory {
  UNDO = 'BROWSER_UNDO',
  REDO = 'BROWSER_REDO'
}

//////////////////////////////////////////////////////////////////////////
// GENERAL
//////////////////////////////////////////////////////////////////////////

export enum ObjTypes {
  ORDER_FOLDER = 'folder',
  ORDER_ITEM = 'item',
  TILE_SMART = 'smartTile',
  TILE_BASIC = 'basicTile',
  TILE_ANIMATED = 'animatedTile',
  SMART_BRUSH = 'smartBrush',
  TILESET = 'tileset',
  SPRITE_BASIC = 'basicSprite',
  SRITE_ANIMATED = 'animatedSprite',
}

export type ID = ReturnType<typeof nanoid>;
export type TileSymbol = {} // TODO
export type Thumbnail = TileSymbol | null
export type Vector2 = { x: number, y: number }
export type Tag = { color?: string, name: string };
export type ImageURL = string;
export type Order = number;

//////////////////////////////////////////////////////////////////////////
// PICKER
//////////////////////////////////////////////////////////////////////////

export interface PickerState { // store
  tileset: null | ID
  picked: null | PickSelection
}
export type PickSelection = Tile
export type PickSelect = ObjTypes.TILE_BASIC | ObjTypes.TILE_ANIMATED


//////////////////////////////////////////////////////////////////////////
// EXPLORER
//////////////////////////////////////////////////////////////////////////


export interface ExplorerState { // store
  smartBrushes: EntityState<SmartBrush>,
  tilesets: EntityState<Tileset>,
  editSelection: null | EditSelection
}
export type EditSelection = {
  type: EditSelect,
  id: ID
}
export type EditSelectObject = Tileset | SmartBrush;
export type EditSelect = ObjTypes.TILESET | ObjTypes.SMART_BRUSH

//////////////////////////////////////////////////////////////////////////
// TILES 
//////////////////////////////////////////////////////////////////////////

export type Tile = AnimatedTile | BasicTile | SmartTile;
export interface SmartTile {
  type: ObjTypes.TILE_SMART
  name: string,
  smartBrush: ID
  sprite: Sprite,
  tags: Tag[],
}
export type BasicTile = {
  type: ObjTypes.TILE_BASIC,
  name: string,
  tileset: ID,
  sprite: BasicSprite,
  tags: Tag[],
}
export type AnimatedTile = {
  type: ObjTypes.TILE_ANIMATED
  name: string,
  tileset: ID,
  sprite: AnimatedSprite,
  tags: Tag[],
}
//////////////////////////////////////////////////////////////////////////
// SMART BRUSH
//////////////////////////////////////////////////////////////////////////

export interface SmartBrush {
  type: ObjTypes.SMART_BRUSH,
  name: string,
  order: Order,
  thumbnail: Thumbnail,
  timelineIndex: number
  isToggle: boolean,
  rulesets: Ruleset[],
  tags: Tag[],
  id: ID,
}
export interface Ruleset {
  index: number
  name: string
  Rulesets: Ruleset[]
}
export interface Rule {
  index: number,
  name: string,
  input: Pattern,
  output: { probability: number, pattern: Pattern }[],
}
export type Pattern = { layer: number, x: number, y: number, patternTile: PatternTile, not: boolean }[]
export type PatternTile = 'any' | SmartBrush | BasicTile

export type Sprite = BasicSprite | AnimatedSprite
export interface BasicSprite {
  type: ObjTypes.TILE_ANIMATED
  tileset: ID,
  pos: { origin: Vector2 },
}
export interface AnimatedSprite {
  type: ObjTypes.TILE_ANIMATED
  tileset: ID,
  pos: { origin: Vector2, delay: number }[]
}

//////////////////////////////////////////////////////////////////////////
// ASSETS
//////////////////////////////////////////////////////////////////////////

export interface Tileset {
  type: ObjTypes.TILESET,
  name: string,
  order: Order,
  image: ImageData | undefined,
  grid: GridSettings,
  animations: AnimatedTile[],
  thumbnail: Thumbnail[],
  filters: TilesetFilter[],
  tags: Tag[],
  id: ID,
}
export type ImageData = {
  url: string,
  width: number,
  height: number,
}
export type GridSettings = {
  columns: number,
  rows: number,
  width: number,
  height: number,
  offset: Offset,
}
export type Offset = { top: number, right: number, bottom: number, left: number }
export type TilesetFilter = 'pixelated' | 'transparent'

