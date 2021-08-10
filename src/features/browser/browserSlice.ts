import { createSlice, createEntityAdapter, PayloadAction, createAction, createSelector, Update } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BrowserHistory, BrowserState, ObjectType, Rule, SmartTile, Tileset, ID, Selection } from './browserTypes';

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
const defaultRule: Rule = {
  type: ObjectType.RULE,
  name: "Nameless Rule",
  tags: [],
  isGlobal: false,
  timelineIndex: 0,
  thumbnail: null,
  Rulesets: [],
  id: '',
}
const defaultSmartTile: SmartTile = {
  type: ObjectType.SMARTTILE,
  name: "Nameless SmartTile",
  tags: [],
  thumbnail: null,
  linkedRules: [],
  id: ''
}
const defaultTileset: Tileset = {
  type: ObjectType.TILESET,
  name: "Nameless Tileset",
  tags: [],
  filters: [],
  sprite: undefined,
  width: 0,
  height: 0,
  grid: {
    columns: 0,
    rows: 0,
    width: 0,
    height: 0,
    offset: { top: 0, right: 0, bottom: 0, left: 0 }
  },
  thumbnail: [],
  id: '',

}

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    addRule: (state, action: PayloadAction<ID>) => {
      const newRule: Rule = { ...defaultRule, id: action.payload, }
      rulesAdapter.addOne(state.rules, newRule)
      state.selection = { type: ObjectType.RULE, id: action.payload }
    },
    addSmartTile: (state, action: PayloadAction<ID>) => {
      const newSmartTile: SmartTile = { ...defaultSmartTile, id: action.payload, }
      smartTilesAdapter.addOne(state.smartTiles, newSmartTile)
      state.selection = { type: ObjectType.SMARTTILE, id: action.payload }
    },
    addTileset: (state, action: PayloadAction<ID>) => {
      const newTileset: Tileset = { ...defaultTileset, id: action.payload, }
      tilesetsAdapter.addOne(state.tilesets, newTileset)
      state.selection = { type: ObjectType.TILESET, id: action.payload } as Selection
    },
    removeRule: (state, action: PayloadAction<ID>) => {
      rulesAdapter.removeOne(state.rules, action.payload)
      if (state.selection && state.selection.id === action.payload)
        state.selection = null
    },
    removeSmartTile: (state, action: PayloadAction<ID>) => {
      smartTilesAdapter.removeOne(state.smartTiles, action.payload)
      if (state.selection && state.selection.id === action.payload)
        state.selection = null
    },
    removeTileset: (state, action: PayloadAction<ID>) => {
      tilesetsAdapter.removeOne(state.tilesets, action.payload)
      if (state.selection && state.selection.id === action.payload)
        state.selection = null
    },
    updateRule: (state, actions: PayloadAction<Update<Rule>>) => { rulesAdapter.updateOne(state.rules, actions.payload) },
    updateSmartTile: (state, actions: PayloadAction<Update<SmartTile>>) => { smartTilesAdapter.updateOne(state.smartTiles, actions.payload) },
    updateTileset: (state, actions: PayloadAction<Update<Tileset>>) => { tilesetsAdapter.updateOne(state.tilesets, actions.payload) },
    select: (state, action: PayloadAction<Selection>) => {
      state.selection = { type: action.payload.type, id: action.payload.id }
    },
    deselect: state => { state.selection = null }
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
export const { addRule, addSmartTile, addTileset, select, deselect, updateRule, updateSmartTile, updateTileset, removeRule, removeSmartTile, removeTileset } = browserSlice.actions;

//Selectors

export const historyIndexSelector = createSelector(
  (state: RootState) => state.browser.index,
  index => index)
export const selectedSelector = createSelector(
  (state: RootState) => state.browser.present,
  state => state.selection)
export const rulesSelector = createSelector(
  (state: RootState) => state.browser.present.rules,
  rulesAdapter.getSelectors().selectAll)
export const smartTilesSelector = createSelector(
  (state: RootState) => state.browser.present.smartTiles, smartTilesAdapter.getSelectors().selectAll)
export const tilesetsSelector = createSelector(
  (state: RootState) => state.browser.present.tilesets,
  tilesetsAdapter.getSelectors().selectAll)
export const selectedContentSelector = createSelector(
  (state: RootState) => state.browser.present,
  (state: BrowserState) => {
    if (!state.selection) return null;
    switch (state.selection.type) {
      case ObjectType.RULE:
        return rulesAdapter.getSelectors().selectById(state.rules, state.selection.id)
      case ObjectType.SMARTTILE:
        return smartTilesAdapter.getSelectors().selectById(state.smartTiles, state.selection.id)
      case ObjectType.TILESET:
        return tilesetsAdapter.getSelectors().selectById(state.tilesets, state.selection.id)
      default:
        return null;
    }
  })

