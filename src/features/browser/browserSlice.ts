import { createSlice, createEntityAdapter, PayloadAction, createAction, createSelector } from '@reduxjs/toolkit';
import { StateWithHistory } from 'redux-undo';
import { RootState } from '../../app/store';
import { BrowserHistory, BrowserState, ObjectType, Rule, SmartTile, Tileset, ID } from './browserTypes';

//Normalize with EntityAdapter
const rulesAdapter = createEntityAdapter<Rule>()
const smartTilesAdapter = createEntityAdapter<SmartTile>()
const tilesetsAdapter = createEntityAdapter<Tileset>()

//Initial State
const initialState: BrowserState = {
  rules: rulesAdapter.getInitialState(),
  smartTiles: smartTilesAdapter.getInitialState(),
  tilesets: tilesetsAdapter.getInitialState(),
  selection: null
}

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    addRule: (state, action: PayloadAction<ID>) => {
      const newRule: Rule = {
        type: ObjectType.RULE,
        name: "Nameless Rule",
        tags: [],
        isGlobal: false,
        timelineIndex: 0,
        thumbnail: null,
        Rulesets: [],
        id: action.payload,
      }
      rulesAdapter.addOne(state.rules, newRule)
      state.selection = { type: ObjectType.RULE, id: action.payload }
    },
    addSmartTile: (state, action: PayloadAction<ID>) => {
      const newSmartTile: SmartTile = {
        type: ObjectType.SMARTTILE,
        name: "Nameless SmartTile",
        tags: [],
        thumbnail: null,
        linkedRules: [],
        id: action.payload,
      }
      smartTilesAdapter.addOne(state.smartTiles, newSmartTile)
      state.selection = { type: ObjectType.SMARTTILE, id: action.payload }
    },
    addTileset: (state, action: PayloadAction<ID>) => {
      const newTileset: Tileset = {
        type: ObjectType.TILESET,
        name: "Nameless Tileset",
        tags: [],
        filters: [],
        image: undefined,
        width: 0,
        height: 0,
        grid: {
          columns: 0,
          rows: 0,
          tile: {
            width: 0,
            height: 0,
            offset: { top: 0, right: 0, bottom: 0, left: 0 },
          },
        },
        thumbnail: [],
        id: action.payload,
      }
      tilesetsAdapter.addOne(state.tilesets, newTileset)
      state.selection = { type: ObjectType.TILESET, id: action.payload }
    },
  }
})

//Reducer 
export default browserSlice.reducer

//Actions 
const historyActions = {
  undo: createAction(BrowserHistory.UNDO),
  redo: createAction(BrowserHistory.REDO)
}
export const { undo, redo } = historyActions
export const { addRule, addSmartTile, addTileset } = browserSlice.actions;

//Selectors
export const selectedContentSelector = createSelector((state: RootState) => state.browser.present, (state: BrowserState) => {
  if (!state.selection) return null;
  switch (state.selection.type) {
    case ObjectType.RULE:
      return rulesAdapter.getSelectors().selectById(state.rules, state.selection.id)
      break;
    case ObjectType.SMARTTILE:
      return smartTilesAdapter.getSelectors().selectById(state.smartTiles, state.selection.id)
      break
    case ObjectType.TILESET:
      return tilesetsAdapter.getSelectors().selectById(state.tilesets, state.selection.id)
      break;
    default:
      return null;
  }
})

