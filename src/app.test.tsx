import {
  AppStateType,
  decMaxValueAC,
  decMinValueAC,
  incCounterAC,
  incMaxValueAC,
  incMinValueAC,
  reducer, resetCounterAC
} from './App';

let state: AppStateType = {
  counter: 0,
  minValue: 0,
  maxValue: 10
};

beforeEach( () => {
  state.counter = 5;
  state.minValue = 3;
  state.maxValue = 10;
} );

test( 'Increment counter', () => {
  const newState = reducer( state, incCounterAC() );
  expect( newState ).not.toBe( state );
  expect( newState.counter ).toBe( state.counter + 1 );
} );

test( 'Increment min value', () => {
  const newState = reducer( state, incMinValueAC() );
  expect( newState ).not.toBe( state );
  expect( newState.minValue ).toBe( state.minValue + 1 );
} );

test( 'Decrement min value', () => {
  const newState = reducer( state, decMinValueAC() );
  expect( newState ).not.toBe( state );
  expect( newState.minValue ).toBe( state.minValue - 1 );
} );

test( 'Increment max value', () => {
  const newState = reducer( state, incMaxValueAC() );
  expect( newState ).not.toBe( state );
  expect( newState.maxValue ).toBe( state.maxValue + 1 );
} );

test( 'Decrement max value', () => {
  const newState = reducer( state, decMaxValueAC() );
  expect( newState ).not.toBe( state );
  expect( newState.maxValue ).toBe( state.maxValue - 1 );
} );

test( 'Reset value', () => {
  const newState = reducer( state, resetCounterAC() );
  expect( newState ).not.toBe( state );
  expect( newState.counter ).toBe( state.minValue );
} );