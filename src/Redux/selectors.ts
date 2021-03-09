import { IGlobalState } from './state';

interface IRootState extends IGlobalState {
}

export const selectCounterState = ( state: IRootState ) => state.counter;