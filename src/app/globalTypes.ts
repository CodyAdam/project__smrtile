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
  SMARTBRUSH = 'smartBrush',
  TILE = 'tile',
  SMARTTILE = 'smartBrush',
  TILESET = 'tileset',
  ANIMATION = 'animation',
  OBJECT = 'object',
}

export type ID = ReturnType<typeof nanoid>;
export type TileSymbol = {} // TODO
export type Thumbnail = TileSymbol | null
export type Vector2 = { x: number, y: number }
export type Tag = { color?: string, name: string };
export type ImageURL = string;

//////////////////////////////////////////////////////////////////////////
// EXPLORER
//////////////////////////////////////////////////////////////////////////


export interface ExplorerState { // store
  smartBrushes: EntityState<SmartBrush>,
  tilesets: EntityState<AssetTileset>,
  leftSelection: null | LeftSelection
  rightSelection: null | RightSelection
}
export type LeftSelection = {
  type: LeftSelect,
  id: ID
}
export type RightSelection = {
  type: RightSelect,
  id: ID
}
export type LeftSelectObject = AssetTileset | SmartBrush;
export type LeftSelect = ObjTypes.TILE | ObjTypes.TILESET | ObjTypes.SMARTBRUSH
export type RightSelectObject = AssetTileset | AssetAnimation | AssetObject;
export type RightSelect = ObjTypes.TILESET | ObjTypes.ANIMATION | ObjTypes.OBJECT


//////////////////////////////////////////////////////////////////////////
// SMART BRUSH
//////////////////////////////////////////////////////////////////////////

export interface SmartBrush {
  type: ObjTypes.SMARTBRUSH,
  name: string,
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
export type Tile = Animation | BasicTile | SmartTile;
export interface BasicTile {
  type: ObjTypes.TILE
  sprite: Sprite,
}
export interface SmartTile {
  type: ObjTypes.SMARTTILE
  smartBrush: ID
  sprite: Sprite,
}
export type Sprite = BasicSprite | AnimatedSprite
export interface BasicSprite {
  tileset: ID,
  pos: { origin: Vector2 },
}
export interface ObjectSprite {
  tileset: ID,
  pos: SpritePosition,
}
export interface AnimatedSprite {
  tileset: ID,
  frames: { delay: number, pos: SpritePosition }[]
}
export type SpritePosition = { origin: Vector2, top: number, right: number, bottom: number, left: number }

//////////////////////////////////////////////////////////////////////////
// ASSETS
//////////////////////////////////////////////////////////////////////////

export interface AssetTileset {
  type: ObjTypes.TILESET,
  name: string,
  image: ImageData | undefined,
  grid: GridSettings,
  animations: AssetAnimation[],
  objects: AssetObject[],
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
export type AssetAnimation = {}
export type AssetObject = {}
export type GridSettings = {
  columns: number,
  rows: number,
  width: number,
  height: number,
  offset: Offset,
}
export type Offset = { top: number, right: number, bottom: number, left: number }
export type TilesetFilter = 'pixelated' | 'transparent'

