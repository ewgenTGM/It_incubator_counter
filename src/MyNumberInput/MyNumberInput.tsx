import React, { VFC } from 'react';
import styles from './MyNumberInput.module.css';

type PropsType = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  error?: boolean
  incDisabled?: boolean
  decDisabled?: boolean
}

export const MyNumberInput: VFC<PropsType> = ( {
                                                 decDisabled,
                                                 incDisabled,
                                                 onDecrement,
                                                 onIncrement,
                                                 value
                                               } ) => {
  return (
      <div className={ styles.MyNumberInput }>
        <button
            className={ styles.btn }
            disabled={ decDisabled }
            onClick={ onDecrement }>
          -
        </button>
        <input
            className={ styles.number_input }
            type="text"
            readOnly={ true }
            value={ value }/>
        <button
            className={ styles.btn }
            disabled={ incDisabled }
            onClick={ onIncrement }>
          +
        </button>
      </div>
  );
};