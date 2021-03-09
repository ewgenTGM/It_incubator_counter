import React from 'react';
import styles from './App.module.css';
import { Board } from './Board/Board';
import { MyButton } from './MyButton/MyButton';
import { MyNumberInput } from './MyNumberInput/MyNumberInput';
import { TypedDispatch } from './Redux/app-reducer';
import { useSelector } from 'react-redux';
import { selectCounterState } from './Redux/selectors';
import {
  decMaxValue,
  decMinValue,
  incCounter,
  incMaxValue,
  incMinValue,
  resetCounter,
  setIsFormBlocked,
  setIsSettersBlocked
} from './Redux/actions';

export const App: React.VFC = () => {

  const dispatch = TypedDispatch();

  const {
    counter,
    minValue,
    maxValue,
    globalMinValue,
    globalMaxValue,
    isFormBlocked,
    isSettersBlocked
  } = useSelector( selectCounterState );

  // useEffect( () => {
  //   dispatch( initAC( globalMinValue, globalMaxValue ) );
  // }, [ globalMinValue, globalMaxValue ] );
  //
  // useEffect( () => {
  //   dispatch( saveStateToLocalStorageAC() );
  // } );
  //
  // useEffect( () => {
  //   const state = loadStateFromLocalStorage();
  //   state && dispatch( loadStateFromLocalStorageAC( state ) );
  // }, [] );

  return (
      <div className={ styles.app }>
        <div className={ styles.app_label }>Exam It-incubator 01</div>
        <div className={ styles.counter }>
          <Board
              text={ counter.toString() }
              isDanger={ counter === maxValue }/>
          <fieldset className={ styles.button_block_fieldset }>
            <legend>Манипуляторы ввода</legend>
            <div className={ styles.button_block }>
              <MyButton
                  labelText='УВЕЛ СЧ'
                  onClickCallback={ () => dispatch( incCounter() ) }
                  isDisabled={ counter === maxValue || isFormBlocked }/>
              <MyButton
                  labelText='СБРОС СЧ'
                  onClickCallback={ () => dispatch( resetCounter() ) }
                  isDisabled={ counter === minValue || isFormBlocked }/>
            </div>
          </fieldset>
          <div className={ styles.model_name }>Электроника 1278 (арт. 17-1457-1983)</div>
        </div>
        <div className={ styles.current_values_block }>
          <span>{ `Global min value: ${ globalMinValue }` }</span><br/>
          <span>{ `Global max value: ${ globalMaxValue }` }</span><br/>

        </div>
        <div className={ styles.setters_block }>
          <MyNumberInput
              value={ minValue }
              onDecrement={ () => {
                dispatch( decMinValue() );
                dispatch( setIsFormBlocked( true ) );
                dispatch( setIsSettersBlocked( false ) );
              } }
              onIncrement={ () => {
                dispatch( incMinValue() );
                dispatch( setIsFormBlocked( true ) );
                dispatch( setIsSettersBlocked( false ) );
              } }
              decDisabled={ minValue === globalMinValue }
              incDisabled={ minValue === maxValue - 1 }/>
          <MyNumberInput
              value={ maxValue }
              onDecrement={ () => {
                dispatch( decMaxValue() );
                dispatch( setIsFormBlocked( true ) );
                dispatch( setIsSettersBlocked( false ) );
              } }
              onIncrement={ () => {
                dispatch( incMaxValue() );
                dispatch( setIsFormBlocked( true ) );
                dispatch( setIsSettersBlocked( false ) );
              } }
              decDisabled={ maxValue === minValue + 1 }
              incDisabled={ maxValue === globalMaxValue }/>
          <button
              onClick={ () => {
                dispatch( resetCounter() );
                dispatch( setIsFormBlocked( false ) );
                dispatch( setIsSettersBlocked( true ) );
              } }
              disabled={ isSettersBlocked }
              className={ styles.btn_set_value }>Set values
          </button>
        </div>
      </div>

  );
};
