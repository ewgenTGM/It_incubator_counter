import React, { useReducer, useState } from 'react';
import styles from './App.module.css';
import MyButton from './MyButton/MyButton';
import Board from './Board/Board';
import MyNumberInput from './MyNumberInput/MyNumberInput';

const INC_COUNTER = 'INC_COUNTER';
const INC_MIN_VALUE = 'INC_MIN_VALUE';
const DEC_MIN_VALUE = 'DEC_MIN_VALUE';
const INC_MAX_VALUE = 'INC_MAX_VALUE';
const DEC_MAX_VALUE = 'DEC_MAX_VALUE';
const RESET_COUNTER = 'RESET_COUNTER';

type ActionsType =
    { type: typeof INC_COUNTER }
    | { type: typeof INC_MIN_VALUE }
    | { type: typeof DEC_MIN_VALUE }
    | { type: typeof INC_MAX_VALUE }
    | { type: typeof DEC_MAX_VALUE }
    | { type: typeof RESET_COUNTER }

export const incCounterAC = (): ActionsType => ( { type: INC_COUNTER } );
export const incMinValueAC = (): ActionsType => ( { type: INC_MIN_VALUE } );
export const decMinValueAC = (): ActionsType => ( { type: DEC_MIN_VALUE } );
export const incMaxValueAC = (): ActionsType => ( { type: INC_MAX_VALUE } );
export const decMaxValueAC = (): ActionsType => ( { type: DEC_MAX_VALUE } );
export const resetCounterAC = (): ActionsType => ( { type: RESET_COUNTER } );


export type AppStateType = {
  counter: number
  minValue: number
  maxValue: number
};

const appState: AppStateType = {
  counter: 0,
  minValue: 0,
  maxValue: 10
};

export const reducer = ( state: AppStateType, action: ActionsType ): AppStateType => {
  switch ( action.type ) {
    case INC_COUNTER:
      return { ...state, counter: state.counter + 1 };
    case INC_MIN_VALUE:
      return { ...state, minValue: state.minValue + 1 };
    case DEC_MIN_VALUE:
      return { ...state, minValue: state.minValue - 1 };
    case INC_MAX_VALUE:
      return { ...state, maxValue: state.maxValue + 1 };
    case DEC_MAX_VALUE:
      return { ...state, maxValue: state.maxValue - 1 };
    case RESET_COUNTER:
      return { ...state, counter: state.minValue };
    default:
      return state;
  }
};

export const App: React.FC = () => {

  const [ state, dispatch ] = useReducer( reducer, appState );

  return (
      <div className={ styles.app }>
        <div className={ styles.app_label }>Exam It-incubator 01</div>
        <div className={ styles.counter }>
          <Board
              text={ state.counter.toString() }
              isDanger={ state.counter === state.maxValue }/>
          <fieldset className={ styles.button_block_fieldset }>
            <legend>Манипуляторы ввода</legend>
            <div className={ styles.button_block }>
              <MyButton
                  labelText='УВЕЛ СЧ'
                  onClickCallback={ () => dispatch( incCounterAC() ) }
                  isDisabled={ state.counter === state.minValue }/>
              <MyButton
                  labelText='СБРОС СЧ'
                  onClickCallback={ () => dispatch( resetCounterAC() ) }
                  isDisabled={ state.counter === state.minValue }/>
            </div>
          </fieldset>
          <div className={ styles.model_name }>Электроника 1278 (арт. 17-1457-1983)</div>
        </div>
        <div className={ styles.current_values_block }>
          <span>{ `Current min value: ${ state.minValue }` }</span><br/>
          <span>{ `Current max value: ${ state.maxValue }` }</span><br/>

        </div>
        <div className={ styles.setters_block }>
          <MyNumberInput
              value={ state.minValue }
              onDecrement={ () => {dispatch( decMinValueAC() );} }
              onIncrement={ () => {dispatch( incMinValueAC() );} }
              decDisabled={ false }
              incDisabled={ false }/>
          <MyNumberInput
              value={ state.maxValue }
              onDecrement={ () => {dispatch( decMaxValueAC() );} }
              onIncrement={ () => {dispatch( incMaxValueAC() );} }
              decDisabled={ false }
              incDisabled={ false }/>
          <button
              onClick={ () => dispatch( resetCounterAC() ) }
              className={ styles.btn_set_value }>Set values
          </button>
        </div>
      </div>

  );
};
