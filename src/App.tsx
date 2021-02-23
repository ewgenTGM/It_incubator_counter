import React, { useEffect, useReducer, useState } from 'react';
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
const SET_IS_FORM_BLOCKED = 'SET_IS_FORM_BLOCKED';
const INIT = 'INIT';

type ActionsType =
    { type: typeof INC_COUNTER }
    | { type: typeof INC_MIN_VALUE }
    | { type: typeof DEC_MIN_VALUE }
    | { type: typeof INC_MAX_VALUE }
    | { type: typeof DEC_MAX_VALUE }
    | { type: typeof RESET_COUNTER }
    | { type: typeof SET_IS_FORM_BLOCKED, payload: boolean }
    | { type: typeof INIT, minValue: number, maxValue: number, counter: number }

export const incCounterAC = (): ActionsType => ( { type: INC_COUNTER } );
export const incMinValueAC = (): ActionsType => ( { type: INC_MIN_VALUE } );
export const decMinValueAC = (): ActionsType => ( { type: DEC_MIN_VALUE } );
export const incMaxValueAC = (): ActionsType => ( { type: INC_MAX_VALUE } );
export const decMaxValueAC = (): ActionsType => ( { type: DEC_MAX_VALUE } );
export const resetCounterAC = (): ActionsType => ( { type: RESET_COUNTER } );
export const setIsFormBlockedAC = ( isBlocked: boolean ): ActionsType => ( {
  type: SET_IS_FORM_BLOCKED,
  payload: isBlocked
} );
export const initAC = ( minValue: number, maxValue: number, counter: number ): ActionsType => ( {
  type: INIT,
  minValue, maxValue, counter
} );


export type AppStateType = {
  counter: number
  minValue: number
  maxValue: number
  isFormBlocked: boolean
};

const appState: AppStateType = {
  counter: 0,
  minValue: 0,
  maxValue: 10,
  isFormBlocked: true
};

export const reducer = ( state: AppStateType, action: ActionsType ): AppStateType => {
  switch ( action.type ) {
    case INIT:
      return { ...state, counter: action.counter, minValue: action.minValue, maxValue: action.maxValue };
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
    case SET_IS_FORM_BLOCKED: {
      return { ...state, isFormBlocked: action.payload };
    }
    default:
      return state;
  }
};

type PropsType = {
  globalMinValue: number
  globalMaxValue: number
  initialMinValue: number
  initialMaxValue: number
}

export const App: React.VFC<PropsType> = ( { globalMinValue, globalMaxValue, initialMaxValue, initialMinValue } ) => {

  useEffect( () => {
    appState.counter = initialMinValue;
    appState.minValue = initialMinValue;
    appState.maxValue = initialMaxValue;
  }, [] );

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
                  isDisabled={ state.counter === state.maxValue || state.isFormBlocked }/>
              <MyButton
                  labelText='СБРОС СЧ'
                  onClickCallback={ () => dispatch( resetCounterAC() ) }
                  isDisabled={ state.counter === state.minValue || state.isFormBlocked }/>
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
              onDecrement={ () => {
                dispatch( decMinValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
              } }
              onIncrement={ () => {
                dispatch( incMinValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
              } }
              decDisabled={ state.minValue === globalMinValue }
              incDisabled={ state.minValue === state.maxValue - 1 }/>
          <MyNumberInput
              value={ state.maxValue }
              onDecrement={ () => {
                dispatch( decMaxValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
              } }
              onIncrement={ () => {
                dispatch( incMaxValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
              } }
              decDisabled={ state.maxValue === state.minValue + 1 }
              incDisabled={ state.maxValue === globalMaxValue }/>
          <button
              onClick={ () => {
                dispatch( resetCounterAC() );
                dispatch( setIsFormBlockedAC( false ) );
              } }
              className={ styles.btn_set_value }>Set values
          </button>
        </div>
      </div>

  );
};
