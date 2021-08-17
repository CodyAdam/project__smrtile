import { createSlice, createEntityAdapter, PayloadAction, createAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { ExplorerHistory, ExplorerState, ObjTypes, SmartBrush, AssetTileset, ID, LeftSelection, LeftSelect, LeftSelectObject } from '../../../app/globalTypes';

//Normalize with EntityAdapter
const smartTilesAdapter = createEntityAdapter<SmartBrush>()
const tilesetsAdapter = createEntityAdapter<AssetTileset>()

//Initial State
const initialState: ExplorerState = {
  smartBrushes: smartTilesAdapter.getInitialState(),
  tilesets: tilesetsAdapter.getInitialState(),
  leftSelection: null,
  rightSelection: null
}
const defaultSmartBrush: SmartBrush = {
  type: ObjTypes.SMARTBRUSH,
  name: "Nameless SmartTile",
  rulesets: [],
  isToggle: false,
  timelineIndex: 0,
  thumbnail: null,
  tags: [],
  id: ''
}
const defaultTileset: AssetTileset = {
  type: ObjTypes.TILESET,
  name: "Nameless Tileset",
  image: undefined,
  grid: {
    columns: 0,
    rows: 0,
    width: 0,
    height: 0,
    offset: { top: 0, right: 0, bottom: 0, left: 0 }
  },
  animations: [],
  objects: [],
  thumbnail: [],
  filters: [],
  tags: [],
  id: '',

}

export const explorerSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ type: LeftSelect, id: ID }>) => {
      const { type, id } = action.payload;
      switch (type) {
        case ObjTypes.SMARTBRUSH:
          smartTilesAdapter.addOne(state.smartBrushes, { ...defaultSmartBrush, id })
          state.leftSelection = { type: ObjTypes.SMARTBRUSH, id }
          break;
        case ObjTypes.TILESET:
          tilesetsAdapter.addOne(state.tilesets, { ...defaultTileset, id })
          state.leftSelection = { type: ObjTypes.TILESET, id }
          break;
      }
    },
    remove: (state, action: PayloadAction<LeftSelectObject>) => {
      const target = action.payload;
      switch (target.type) {
        case ObjTypes.SMARTBRUSH:
          smartTilesAdapter.removeOne(state.smartBrushes, target.id)
          if (state.leftSelection && state.leftSelection.id === target.id)
            state.leftSelection = null
          break;
        case ObjTypes.TILESET:
          tilesetsAdapter.removeOne(state.tilesets, target.id)
          if (state.leftSelection && state.leftSelection.id === target.id)
            state.leftSelection = null
          break;
      }
    },
    update: (state, actions: PayloadAction<{ target: LeftSelectObject, changes: Partial<LeftSelectObject> }>) => {
      const { target, changes } = actions.payload;
      switch (target.type) {
        case ObjTypes.SMARTBRUSH: smartTilesAdapter.updateOne(state.smartBrushes, { id: target.id, changes: changes as SmartBrush })
          break
        case ObjTypes.TILESET: tilesetsAdapter.updateOne(state.tilesets, { id: target.id, changes: changes as AssetTileset })
          break;
      }
    },
    select: (state, action: PayloadAction<LeftSelection>) => {
      state.leftSelection = { type: action.payload.type, id: action.payload.id }
    },
    deselect: state => { state.leftSelection = null }
  }
})

//Reducer 
export default explorerSlice.reducer

//Actions 
const historyActions = {
  undo: createAction(ExplorerHistory.UNDO),
  redo: createAction(ExplorerHistory.REDO)
}
export const { undo, redo } = historyActions
export const { add, select, deselect, update, remove } = explorerSlice.actions;

//Selectors
export const historyIndexSelector = createSelector(
  (state: RootState) => state.browser.index,
  index => index)
export const selectedSelector = createSelector(
  (state: RootState) => state.browser.present,
  state => state.leftSelection)
export const smartTilesSelector = createSelector(
  (state: RootState) => state.browser.present.smartBrushes, smartTilesAdapter.getSelectors().selectAll)
export const tilesetsSelector = createSelector(
  (state: RootState) => state.browser.present.tilesets,
  tilesetsAdapter.getSelectors().selectAll)
export const selectedContentSelector = createSelector(
  (state: RootState) => state.browser.present,
  (state: ExplorerState) => {
    if (!state.leftSelection) return null;
    switch (state.leftSelection.type) {
      case ObjTypes.SMARTBRUSH:
        return smartTilesAdapter.getSelectors().selectById(state.smartBrushes, state.leftSelection.id)
      case ObjTypes.TILESET:
        return tilesetsAdapter.getSelectors().selectById(state.tilesets, state.leftSelection.id)
      default:
        return null;
    }
  })

