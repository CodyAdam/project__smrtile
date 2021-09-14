import { createSlice, createEntityAdapter, PayloadAction, createAction, createSelector, EntityState } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ExplorerHistory, ExplorerState, Types, SmartBrush, Tileset, ID, EditSelection, EditSelect, EditSelectObject, Order } from '../types/general';

//Normalize with EntityAdapter
const smartTilesAdapter = createEntityAdapter<SmartBrush>()
const tilesetsAdapter = createEntityAdapter<Tileset>()

//Initial State
const initialState: ExplorerState = {
  smartBrushes: smartTilesAdapter.getInitialState(),
  tilesets: tilesetsAdapter.getInitialState(),
  editSelection: null,
}
const defaultSmartBrush: SmartBrush = {
  type: Types.BRUSH,
  name: "New Smart Tile",
  order: 0,
  rulesets: [],
  isToggle: false,
  timelineIndex: 0,
  thumbnail: null,
  tags: [],
  id: ''
}
const defaultTileset: Tileset = {
  type: Types.TILESET,
  name: "New Tileset",
  order: 0,
  image: undefined,
  grid: {
    columns: 0,
    rows: 0,
    width: 0,
    height: 0,
    offset: { top: 0, right: 0, bottom: 0, left: 0 }
  },
  thumbnail: [],
  filters: [],
  tags: [],
  id: '',

}

function orderIncrementFrom<T extends { order: Order, }>(input: EntityState<T>, index: number): EntityState<T> {
  input.ids.forEach(id => {
    const element = input.entities[id]
    if (element && element.order >= index)
      element.order = element.order + 1;
  });
  return input;
}
function orderDecrementFrom<T extends { order: Order, }>(input: EntityState<T>, index: number): EntityState<T> {
  input.ids.forEach(id => {
    const element = input.entities[id]
    if (element && element.order >= index)
      element.order = element.order - 1;
  });
  return input;
}

export const explorerSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ type: EditSelect, id: ID }>) => {
      const { type, id } = action.payload;
      switch (type) {
        case Types.BRUSH:
          state.smartBrushes = orderIncrementFrom(state.smartBrushes, 0);
          smartTilesAdapter.addOne(state.smartBrushes, { ...defaultSmartBrush, id })
          state.editSelection = { type: Types.BRUSH, id }
          break;
        case Types.TILESET:
          state.tilesets.ids.forEach(id => {
            const element = state.tilesets.entities[id]
            if (element)
              element.order = element.order + 1;
          });
          tilesetsAdapter.addOne(state.tilesets, { ...defaultTileset, id })
          state.editSelection = { type: Types.TILESET, id }
          break;
      }
    },
    remove: (state, action: PayloadAction<EditSelectObject>) => {
      const target = action.payload;
      switch (target.type) {
        case Types.BRUSH:
          smartTilesAdapter.removeOne(state.smartBrushes, target.id)
          if (state.editSelection && state.editSelection.id === target.id)
            state.editSelection = null
          break;
        case Types.TILESET:
          tilesetsAdapter.removeOne(state.tilesets, target.id)
          if (state.editSelection && state.editSelection.id === target.id)
            state.editSelection = null
          break;
      }
    },
    update: (state, action: PayloadAction<{ target: EditSelectObject, changes: Partial<EditSelectObject> }>) => {
      const { target, changes } = action.payload;
      switch (target.type) {
        case Types.BRUSH: smartTilesAdapter.updateOne(state.smartBrushes, { id: target.id, changes: changes as SmartBrush })
          break
        case Types.TILESET: tilesetsAdapter.updateOne(state.tilesets, { id: target.id, changes: changes as Tileset })
          break;
      }
    },
    insertAt: (state, action: PayloadAction<{ target: EditSelectObject, order: Order }>) => {
      const { target, order } = action.payload;
      switch (target.type) {
        case Types.BRUSH:
          state.smartBrushes = orderDecrementFrom(state.smartBrushes, target.order);
          state.smartBrushes = orderIncrementFrom(state.smartBrushes, order);
          const smartBrush = state.smartBrushes.entities[target.id];
          if (smartBrush)
            smartBrush.order = order;
          break
        case Types.TILESET:
          state.smartBrushes = orderDecrementFrom(state.smartBrushes, target.order);
          state.smartBrushes = orderIncrementFrom(state.smartBrushes, order);
          const tileset = state.smartBrushes.entities[target.id];
          if (tileset)
            tileset.order = order;
          break;
      }
    },
    select: (state, action: PayloadAction<EditSelection>) => {
      state.editSelection = { type: action.payload.type, id: action.payload.id }
    },
    deselect: state => { state.editSelection = null },

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
export const { add, select, deselect, update, remove, insertAt } = explorerSlice.actions;

//Selectors
export const historyIndexSelector = createSelector(
  (state: RootState) => state.browser.index,
  index => index)
export const selectedSelector = createSelector(
  (state: RootState) => state.browser.present,
  state => state.editSelection)
export const smartTilesSelector = createSelector(
  (state: RootState) => state.browser.present.smartBrushes, smartTilesAdapter.getSelectors().selectAll)
export const tilesetsSelector = createSelector(
  (state: RootState) => state.browser.present.tilesets,
  tilesetsAdapter.getSelectors().selectAll)
export const selectedContentSelector = createSelector(
  (state: RootState) => state.browser.present,
  (state: ExplorerState) => {
    if (!state.editSelection) return null;
    switch (state.editSelection.type) {
      case Types.BRUSH:
        return smartTilesAdapter.getSelectors().selectById(state.smartBrushes, state.editSelection.id)
      case Types.TILESET:
        return tilesetsAdapter.getSelectors().selectById(state.tilesets, state.editSelection.id)
      default:
        return null;
    }
  })

