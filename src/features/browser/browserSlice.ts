import { createSlice } from '@reduxjs/toolkit';

export interface Normalized<T> {
  byId: { [id: string]: T };
  allIds: string[];
}
export enum ObjectType {
  TILE = 'tile',
  TILESET = 'tileset',
  SMARTTILE = 'smartTile',
  RULE = 'rule',
  RULESET = 'ruleset',
  TILEGROUP = 'tileGroup',
  TAG = 'tag'
}

export type TileSymbol = {} // TODO
export type Thumbnail = Tile | TileSymbol
export type Vector2 = { x: number, y: number }
export type Tag = { type: ObjectType.TAG, value: string };
export type Base64 = string;
export type TileGroup = Tile[]
export type Tile = BasicTile | SmartTile
export interface BasicTile {
  type: ObjectType.TILE
  tilesetPosition: Vector2
  tileset: TilesetId
}

export interface BrowserState { // store
  rules: Normalized<Rule>,
  smartTiles: Normalized<SmartTile>,
  tilesets: Normalized<Tileset>,
  selection: BrowserSelectable
}
export type BrowserSelectable = Rule | Tileset | SmartTile | null

export interface Rule {
  type: ObjectType.RULE
  name: string
  tags: Tag[]
  isGlobal: boolean
  timelineIndex: number
  thumbnail: Thumbnail
  id: RuleId
  Rulesets: Ruleset[]
}
export type RuleId = `${ObjectType.RULE}#${string}`

export interface Ruleset {
  type: ObjectType.RULESET
  name: string
  input: Pattern
  output: { probability: number, pattern: Pattern }[]
}
export type Pattern = { x: number, y: number, patternTile: PatternTile, not: boolean }[]
export type PatternTile = 'any' | Tile | Tag[]

export interface SmartTile {
  type: ObjectType.SMARTTILE
  name: string
  tags: Tag[]
  thumbnail: Thumbnail
  linkedRules: Rule[]
  id: SmartTileId
}
export type SmartTileId = `${ObjectType.SMARTTILE}#${string}`

export interface Tileset {
  type: ObjectType.TILESET
  name: string
  tags: Tag[]
  filters: TilesetFilter[]
  image: Base64
  width: number
  height: number
  grid: {
    columns: number
    rows: number
    tile: {
      width: number
      height: number
      offset: Offset
    },
  }
  thumbnail: Thumbnail[]
  id: TilesetId
}
export type TilesetFilter = 'pixelated' | 'transparent'
export type Offset = { top: number, right: number, bottom: number, left: number }
export type TilesetId = `${ObjectType.TILESET}#${string}`

const initialState: BrowserState = {
  rules: {
    byId: {},
    allIds: [],
  },
  smartTiles: {
    byId: {},
    allIds: [],
  },
  tilesets: {
    byId: {},
    allIds: [],
  },
  selection: null
}

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {}
})