import React, { useEffect, useReducer } from 'react';
import styles from './App.module.css';
import { Board } from './Board/Board';
import { MyButton } from './MyButton/MyButton';
import { MyNumberInput } from './MyNumberInput/MyNumberInput';

const INC_COUNTER = 'INC_COUNTER';
const INC_MIN_VALUE = 'INC_MIN_VALUE';
const DEC_MIN_VALUE = 'DEC_MIN_VALUE';
const INC_MAX_VALUE = 'INC_MAX_VALUE';
const DEC_MAX_VALUE = 'DEC_MAX_VALUE';
const RESET_COUNTER = 'RESET_COUNTER';
const SET_IS_FORM_BLOCKED = 'SET_IS_FORM_BLOCKED';
const SET_IS_SETTERS_BLOCKED = 'SET_IS_SETTERS_BLOCKED';
const INIT = 'INIT';
const SAVE_STATE_TO_LOCAL_STORAGE = 'SAVE_STATE_TO_LOCAL_STORAGE';
const LOAD_STATE_FROM_LOCAL_STORAGE = 'LOAD_STATE_FROM_LOCAL_STORAGE';

type ActionsType =
    { type: typeof INC_COUNTER }
    | { type: typeof INC_MIN_VALUE }
    | { type: typeof DEC_MIN_VALUE }
    | { type: typeof INC_MAX_VALUE }
    | { type: typeof DEC_MAX_VALUE }
    | { type: typeof RESET_COUNTER }
    | { type: typeof SET_IS_FORM_BLOCKED, payload: boolean }
    | { type: typeof SET_IS_SETTERS_BLOCKED, payload: boolean }
    | { type: typeof INIT, globalMinValue: number, globalMaxValue: number }
    | { type: typeof SAVE_STATE_TO_LOCAL_STORAGE }
    | { type: typeof LOAD_STATE_FROM_LOCAL_STORAGE, state: AppStateType }

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
export const setIsSettersBlockedAC = ( isBlocked: boolean ): ActionsType => ( {
  type: SET_IS_SETTERS_BLOCKED,
  payload: isBlocked
} );
export const initAC = ( globalMinValue: number, globalMaxValue: number ): ActionsType => ( {
  type: INIT,
  globalMinValue, globalMaxValue
} );
export const saveStateToLocalStorageAC = (): ActionsType => ( { type: SAVE_STATE_TO_LOCAL_STORAGE } );
export const loadStateFromLocalStorageAC = ( state: AppStateType ): ActionsType => ( {
  type: LOAD_STATE_FROM_LOCAL_STORAGE,
  state
} );


const saveStateToLocalStorage = ( state: AppStateType ): void => {
  localStorage.setItem( 'app_state', JSON.stringify( state ) );
};
const loadStateFromLocalStorage = (): AppStateType | null => {
  const item: string | null = localStorage.getItem( 'app_state' );
  return item ? JSON.parse( item ) : null;
};
const clearStateInLocalStorage = (): void => {
  localStorage.removeItem( 'app_state' );
};

export type AppStateType = {
  counter: number
  minValue: number
  maxValue: number
  globalMinValue: number
  globalMaxValue: number
  isFormBlocked: boolean
  isSettersBlocked: boolean
};

const appState: AppStateType = {
  counter: 0,
  minValue: 0,
  maxValue: 10,
  globalMinValue: 0,
  globalMaxValue: 10,
  isFormBlocked: true,
  isSettersBlocked: false
};

export const reducer = ( state: AppStateType, action: ActionsType ): AppStateType => {
  switch ( action.type ) {
    case INIT:
      return {
        ...state,
        counter: action.globalMinValue,
        minValue: action.globalMinValue,
        maxValue: action.globalMaxValue,
        globalMinValue: action.globalMinValue,
        globalMaxValue: action.globalMaxValue
      };
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
    case SET_IS_SETTERS_BLOCKED: {
      return { ...state, isSettersBlocked: action.payload };
    }
    case SAVE_STATE_TO_LOCAL_STORAGE: {
      saveStateToLocalStorage( state );
      return state;
    }
    case LOAD_STATE_FROM_LOCAL_STORAGE: {
      return { ...action.state };
    }
    default:
      return state;
  }
};

type PropsType = {
  globalMinValue: number
  globalMaxValue: number
}

export const App: React.VFC<PropsType> = ( {
                                             globalMinValue,
                                             globalMaxValue
                                           } ) => {

  useEffect( () => {
    dispatch( initAC( globalMinValue, globalMaxValue ) );
  }, [ globalMinValue, globalMaxValue ] );

  useEffect( () => {
    dispatch( saveStateToLocalStorageAC() );
  } );

  useEffect( () => {
    const state = loadStateFromLocalStorage();
    state && dispatch( loadStateFromLocalStorageAC( state ) );
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
          <span>{ `Global min value: ${ state.globalMinValue }` }</span><br/>
          <span>{ `Global max value: ${ state.globalMaxValue }` }</span><br/>

        </div>
        <div className={ styles.setters_block }>
          <MyNumberInput
              value={ state.minValue }
              onDecrement={ () => {
                dispatch( decMinValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
                dispatch( setIsSettersBlockedAC( false ) );
              } }
              onIncrement={ () => {
                dispatch( incMinValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
                dispatch( setIsSettersBlockedAC( false ) );
              } }
              decDisabled={ state.minValue === globalMinValue }
              incDisabled={ state.minValue === state.maxValue - 1 }/>
          <MyNumberInput
              value={ state.maxValue }
              onDecrement={ () => {
                dispatch( decMaxValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
                dispatch( setIsSettersBlockedAC( false ) );
              } }
              onIncrement={ () => {
                dispatch( incMaxValueAC() );
                dispatch( setIsFormBlockedAC( true ) );
                dispatch( setIsSettersBlockedAC( false ) );
              } }
              decDisabled={ state.maxValue === state.minValue + 1 }
              incDisabled={ state.maxValue === globalMaxValue }/>
          <button
              onClick={ () => {
                dispatch( resetCounterAC() );
                dispatch( setIsFormBlockedAC( false ) );
                dispatch( setIsSettersBlockedAC( true ) );
              } }
              disabled={ state.isSettersBlocked }
              className={ styles.btn_set_value }>Set values
          </button>
        </div>
      </div>

  );
};
