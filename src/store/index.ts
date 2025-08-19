import { combineReducers, configureStore } from '@reduxjs/toolkit';
import vegetableReducer from './reducers/VegetableSlice';

const rootReducer = combineReducers({
  vegetable: vegetableReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
