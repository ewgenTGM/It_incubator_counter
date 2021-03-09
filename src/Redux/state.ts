import { combineReducers, createStore } from 'redux';
import { counterReducer } from './app-reducer';

const rootReducer = combineReducers( {
  counter: counterReducer
} );

export type IGlobalState = ReturnType<typeof rootReducer>;

export const store = createStore( rootReducer );