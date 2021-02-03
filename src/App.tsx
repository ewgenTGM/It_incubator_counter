import React, { useState } from 'react';
import styles from './App.module.css';
import MyButton from './MyButton/MyButton';
import Board from './Board/Board';
import MyNumberInput from './MyNumberInput/MyNumberInput';


function App() {
  const minCounterValue: number = 5;
  const maxCounterValue: number = 10;

  const [ counter, setCounter ] = useState<number>( 0 );

  const resetCounter = () => setCounter( 0 );
  const incCounter = () => setCounter( counter + 1 );

  const onInputChange = ( value: string ) => console.log( value );

  return (
      <div className={ styles.app }>
        <div className={ styles.app_label }>Exam It-incubator 01</div>
        <div className={ styles.counter }>
          <Board
              text={ counter.toString() }
              isDanger={ counter === maxCounterValue }/>
          <fieldset className={ styles.button_block_fieldset }>
            <legend>Манипуляторы ввода</legend>
            <div className={ styles.button_block }>
              <MyButton
                  labelText='УВЕЛ СЧ'
                  onClickCallback={ incCounter }
                  isDisabled={ counter === maxCounterValue }/>
              <MyButton
                  labelText='СБРОС СЧ'
                  onClickCallback={ resetCounter }
                  isDisabled={ counter === 0 }/>
            </div>
          </fieldset>
          <div className={ styles.model_name }>Электроника 1278 (арт. 17-1457-1983)</div>
        </div>
        <MyNumberInput
            minValue={ minCounterValue }
            maxValue={ maxCounterValue }
            onChange={ onInputChange }/>
      </div>
  );
}

export default App;
