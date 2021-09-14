import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import explorerReducer from './explorerSlice';
import pickerReducer from './pickerSlice'
import undoable from 'redux-undo';
import { ExplorerHistory } from '../types/general';

export const store = configureStore({
  reducer: {
    browser: undoable(explorerReducer, { undoType: ExplorerHistory.UNDO, redoType: ExplorerHistory.REDO }),
    picker: pickerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;