import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => {
  //   if (__DEV__) {
  //     const createDebugger = require('redux-flipper').default;
  //     return getDefaultMiddleware().concat(createDebugger());
  //   }
  //   return getDefaultMiddleware();
  // },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
