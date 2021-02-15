import React, { useState } from 'react';
import styles from './App.module.css';
import MyButton from './MyButton/MyButton';
import Board from './Board/Board';
import MyNumberInput from './MyNumberInput/MyNumberInput';


function App() {

  const initialMinCounterValue: number = 0;
  const initialMaxCounterValue: number = 10;

  const [ counter, setCounter ] = useState<number>( initialMinCounterValue );
  const [ minCounterValue, setMinCounterValue ] = useState<number>( initialMinCounterValue );
  const [ maxCounterValue, setMaxCounterValue ] = useState<number>( initialMinCounterValue );
  const [ minValue, setMinValue ] = useState<number>( initialMinCounterValue );
  const [ maxValue, setMaxValue ] = useState<number>( initialMaxCounterValue );

  const resetCounter = () => setCounter( minValue );
  const incCounter = () => setCounter( counter + 1 );
  const setMinMaxValue = () => {
    resetCounter();
    setMinCounterValue( minValue );
    setMaxCounterValue( maxValue );
  };

  return (
      <div className={ styles.app }>
        <div className={ styles.app_label }>Exam It-incubator 01</div>
        <div className={ styles.counter }>
          <Board
              text={ counter.toString() }
              isDanger={ counter === initialMaxCounterValue }/>
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
                  isDisabled={ counter === minCounterValue }/>
            </div>
          </fieldset>
          <div className={ styles.model_name }>Электроника 1278 (арт. 17-1457-1983)</div>
        </div>
        <div className={ styles.current_values_block }>
          <span>{ `Current min value: ${ minCounterValue }` }</span><br/>
          <span>{ `Current max value: ${ maxCounterValue }` }</span><br/>
          <span>{ `Global interval: [${ initialMinCounterValue }, ${initialMaxCounterValue}]` }</span>

        </div>
        <div className={ styles.setters_block }>
          <MyNumberInput
              onValueChange={ setMinValue }
              value={ minValue }
              decDisabled={ minValue === initialMinCounterValue }
              incDisabled={ minValue === maxValue - 1 }/>
          <MyNumberInput
              onValueChange={ setMaxValue }
              value={ maxValue }
              decDisabled={ maxValue === minValue + 1 }
              incDisabled={ maxValue === initialMaxCounterValue }/>
          <button onClick={ setMinMaxValue } className={styles.btn_set_value}>Set values</button>
        </div>
      </div>

  );
}

export default App;
