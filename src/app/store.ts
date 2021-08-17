import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import explorerReducer from '../features/creator/explorer/explorerSlice';
import undoable from 'redux-undo';
import { ExplorerHistory } from './globalTypes';

export const store = configureStore({
  reducer: {
    browser: undoable(explorerReducer, { undoType: ExplorerHistory.UNDO, redoType: ExplorerHistory.REDO }),
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